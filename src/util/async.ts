import { getTypedError } from './error.js';

/**
 * Returns a promise with delayed resolve.
 */
export const delayPromise = (delayMS: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, delayMS);
  });

/**
 * Async method call retry helper.
 */
export const retryAsync = async <T>(method: () => Promise<T>, numTries = 1, delayMs = 100): Promise<T> => {
  for (let attempt = 0; attempt <= numTries; attempt += 1) {
    try {
      // oxlint-disable-next-line no-await-in-loop
      return await method();
    } catch (error) {
      if (attempt === numTries) {
        throw getTypedError(error);
      }
      if (delayMs > 0) {
        // oxlint-disable-next-line no-await-in-loop
        await delayPromise(delayMs);
      }
    }
  }
  throw new Error('Unknown error');
};

/**
 * Load JSON file using a fetch GET request.
 */
export const loadJSON = async (url: string): Promise<unknown> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new DOMException(`Fetch error ${response.status}`, 'FetchError');
  }
  return response.json();
};
