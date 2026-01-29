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
