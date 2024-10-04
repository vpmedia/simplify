import { HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN, HTTP_405_METHOD_NOT_ALLOWED } from '../const/http_status.js';
import { Logger } from '../logging/Logger.js';
import { delayPromise } from './delayPromise.js';

const logger = new Logger('fetch');

export class FetchError extends Error {
  /**
   * Creates a new FetchError instance.
   * @param {string} message - Error message.
   * @param {Response} response - Fetch response object.
   */
  constructor(message, response) {
    super(message);
    this.response = response;
    // Error.captureStackTrace(this, FetchError);
  }
}

/**
 * Fetch with retry.
 * @param {string | URL | Request} resource - Fetch URL.
 * @param {RequestInit} [fetchOptions] - Fetch options.
 * @param {{delay?: number, numTries?: number, statusExcludes?: number[]}} [retryOptions] - Retry options.
 * @returns {Promise<Response>} Fetch result.
 */
export const fetchRetry = async (resource, fetchOptions, retryOptions) => {
  retryOptions = retryOptions ?? {};
  retryOptions.delay = Math.max(retryOptions.delay ?? 500, 1);
  retryOptions.numTries = Math.max(retryOptions.numTries ?? 3, 1);
  retryOptions.statusExcludes = retryOptions.statusExcludes ?? [
    HTTP_401_UNAUTHORIZED,
    HTTP_403_FORBIDDEN,
    HTTP_405_METHOD_NOT_ALLOWED,
  ];
  while (retryOptions.numTries > 0) {
    logger.info('request', { resource, fetchOptions, retryOptions });
    try {
      const response = await fetch(resource, fetchOptions);
      if (!response.ok) {
        logger.warn('failure', response);
        throw new FetchError(`fetch ${response.url} returned status ${response.status}`, response);
      }
      logger.info('success', response);
      return response;
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      logger.error('error', typedError);
      retryOptions.numTries -= 1;
      if (
        retryOptions.numTries === 0 ||
        (typedError instanceof FetchError && retryOptions.statusExcludes.includes(typedError.response.status))
      ) {
        throw error;
      }
      await delayPromise(retryOptions.delay);
      retryOptions.delay *= 2;
    }
  }
};