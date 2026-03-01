import { getTypedError } from './error.js';

/**
 * Returns a promise with delayed resolve.
 * @param {number} delayMS - Promise resolve delay in milliseconds.
 * @returns {Promise<void>} Delayed resolve promise.
 */
export const delayPromise = (delayMS) =>
  new Promise((resolve) => {
    setTimeout(resolve, delayMS);
  });

/**
 * Async method call retry helper.
 * @template T
 * @param {() => Promise<T>} method - Async function to call.
 * @param {number} numTries - Max retries.
 * @param {number} delayMs - Delay between attempts in ms.
 * @returns {Promise<T>} Async function result.
 */
export const retryAsync = async (method, numTries = 1, delayMs = 100) => {
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
 * @param {string} url - URL to load.
 * @returns {Promise<unknown>} The parsed JSON data.
 */
export const loadJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new DOMException(`Fetch error ${response.status}`, 'FetchError');
  }
  return response.json();
};
