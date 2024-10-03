/**
 * Returns a promise with delayed resolve.
 * @param {number} delayMS - Promise resolve delay in milliseconds.
 * @returns {Promise<void>} Delayed resolve promise.
 */
export const delayPromise = (delayMS) => new Promise((resolve) => setTimeout(resolve, delayMS));
