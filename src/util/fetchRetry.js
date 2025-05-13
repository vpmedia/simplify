import {
  HTTP_401_UNAUTHORIZED,
  HTTP_403_FORBIDDEN,
  HTTP_405_METHOD_NOT_ALLOWED,
  HTTP_422_UNPROCESSABLE_ENTITY,
} from '../const/http_status.js';
import { Logger } from '../logging/Logger.js';
import { delayPromise } from './delayPromise.js';
import { getErrorDetails } from './getErrorDetails.js';

const logger = new Logger('fetch');

export const HTTP_0_ANY = 0;

export class FetchError extends Error {
  /**
   * Creates a new FetchError instance.
   * @param {string} message - Error message.
   * @param {string | URL | Request} resource - Fetch URL.
   * @param {RequestInit} fetchOptions - Fetch options.
   * @param {Response} response - Fetch response.
   */
  constructor(message, resource, fetchOptions, response) {
    super(message);
    this.name = 'FetchError';
    this.resource = resource;
    this.fetchOptions = fetchOptions;
    this.response = response;
  }
}

/**
 * Fetch with retry.
 * @param {string | URL | Request} resource - Fetch URL.
 * @param {RequestInit} [fetchOptions] - Fetch options.
 * @param {{delay?: number, numTries?: number, statusExcludes?: number[], timeout?: number}} [retryOptions] - Retry options.
 * @returns {Promise<Response>} Fetch result.
 */
export const fetchRetry = async (resource, fetchOptions, retryOptions) => {
  retryOptions = retryOptions ?? {};
  retryOptions.timeout = Math.max(retryOptions.timeout ?? 10000, 1000);
  retryOptions.delay = Math.max(retryOptions.delay ?? 500, 1);
  retryOptions.numTries = Math.max(retryOptions.numTries ?? 3, 1);
  retryOptions.statusExcludes = retryOptions.statusExcludes ?? [
    HTTP_401_UNAUTHORIZED,
    HTTP_403_FORBIDDEN,
    HTTP_405_METHOD_NOT_ALLOWED,
    HTTP_422_UNPROCESSABLE_ENTITY,
  ];
  while (retryOptions.numTries > 0) {
    logger.info('request', { resource, fetchOptions, retryOptions });
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), retryOptions.timeout);
    fetchOptions.signal = controller.signal;
    try {
      const response = await fetch(resource, fetchOptions);
      if (!response.ok) {
        logger.warn('failure', response);
        throw new FetchError(
          `fetch ${response.url} returned status ${response.status}`,
          resource,
          fetchOptions,
          response
        );
      }
      logger.info('success', response);
      return response;
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      logger.error('error', typedError);
      logger.info('errorDetails', getErrorDetails(typedError));
      retryOptions.numTries -= 1;
      if (
        retryOptions.numTries === 0 ||
        (typedError instanceof FetchError &&
          (retryOptions.statusExcludes.includes(typedError.response.status) ||
            retryOptions.statusExcludes.includes(HTTP_0_ANY)))
      ) {
        throw error;
      }
      await delayPromise(retryOptions.delay);
      retryOptions.delay *= 2;
    } finally {
      clearTimeout(timeoutId);
    }
  }
};
