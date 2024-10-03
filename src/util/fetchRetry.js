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
export const fetchRetry = (resource, fetchOptions, retryOptions) => {
  retryOptions = retryOptions ?? {};
  retryOptions.delay = retryOptions.delay ?? 1000;
  retryOptions.numRetries = retryOptions.numRetries ?? 3;
  retryOptions.isLog = retryOptions.isLog ?? false;
  return fetch(resource, fetchOptions)
    .then((response) => {
      if (retryOptions.isLog && !response.ok) {
        logger.warn('Fetch failed', { fetchOptions, responseStatus: response.status });
      }
      return response.ok ? response.json() : Promise.reject(response);
    })
    .catch((error) => {
      if (retryOptions.isLog) {
        logger.exception('Fetch error', error);
      }
      retryOptions.numRetries -= 1;
      retryOptions.delay *= 2;
      if (retryOptions.numRetries > 0) {
        if (retryOptions.isLog) {
          logger.warn('Fetch retry', { resource, fetchOptions, retryOptions });
        }
        delayPromise(retryOptions.delay).then(() => {
          return fetchRetry(resource, fetchOptions, retryOptions);
        });
      } else {
        throw error;
      }
    });
};
