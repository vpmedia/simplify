import { Logger } from '../logging/Logger.js';
import { delayPromise } from './delayPromise.js';

const logger = new Logger('fetchRetry');

/**
 * Fetch with retry.
 * @param {string | URL | Request} resource - Fetch URL.
 * @param {RequestInit} [fetchOptions] - Fetch options.
 * @param {{ delay?: number, numRetries?: number, isLog?: boolean}} [retryOptions] - Retry options.
 * @returns {Promise<Response>} Fetch result.
 */
export const fetchRetry = async (resource, fetchOptions, retryOptions) => {
  retryOptions = retryOptions ?? {};
  retryOptions.delay = retryOptions.delay ?? 1000;
  retryOptions.numRetries = retryOptions.numRetries ?? 3;
  while (retryOptions.numRetries > 0) {
    logger.info('Fetch request', { resource, fetchOptions, retryOptions });
    try {
      const response = await fetch(resource, fetchOptions);
      if (!response.ok || retryOptions.numRetries > 3) {
        logger.warn('Fetch response', response);
        throw new Error(`Network error: ${response.status}`, { cause: response.status });
      }
      logger.info('Fetch response', response);
      return response;
    } catch (error) {
      logger.error('Fetch error', error instanceof Error ? error : new Error(String(error)));
      if (retryOptions.numRetries === 0) {
        throw error;
      }
      await delayPromise(retryOptions.delay);
      retryOptions.numRetries -= 1;
      retryOptions.delay *= 2;
    }
  }
};
