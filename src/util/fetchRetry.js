import { Logger } from '../logging/Logger.js';
import { delayPromise } from './delayPromise.js';

const logger = new Logger('fetch');

/**
 * Fetch with retry.
 * @param {string | URL | Request} resource - Fetch URL.
 * @param {RequestInit} [fetchOptions] - Fetch options.
 * @param {{ delay?: number, numTries?: number, isLog?: boolean}} [retryOptions] - Retry options.
 * @returns {Promise<Response>} Fetch result.
 */
export const fetchRetry = async (resource, fetchOptions, retryOptions) => {
  retryOptions = retryOptions ?? {};
  retryOptions.delay = Math.max(retryOptions.delay ?? 500, 1);
  retryOptions.numTries = Math.max(retryOptions.numTries ?? 3, 1);
  while (retryOptions.numTries > 0) {
    logger.info('request', { resource, fetchOptions, retryOptions });
    try {
      const response = await fetch(resource, fetchOptions);
      if (!response.ok) {
        logger.warn('failure', response);
        throw new Error(`fetch ${response.url} returned status ${response.status}`, { cause: response.status });
      }
      logger.info('success', response);
      return response;
    } catch (error) {
      logger.error('error', error instanceof Error ? error : new Error(String(error)));
      retryOptions.numTries -= 1;
      if (retryOptions.numTries === 0) {
        throw error;
      }
      await delayPromise(retryOptions.delay);
      retryOptions.delay *= 2;
    }
  }
};
