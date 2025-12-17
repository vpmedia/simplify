import { sanitizeURLParam } from './sanitizeURLParam.js';

const urlSearchParams = new URLSearchParams(window.location.search);

/**
 * Get a URL parameter value.
 * @template T
 * @param {string} key - The name of the URL parameter to retrieve.
 * @param {T} defaultValue - The default value to return if the parameter is not found.
 * @param {boolean} isSanitize - Whether to sanitize the parameter value.
 * @returns {string | T} The URL parameter value or the default value if not found.
 */
export const getURLParam = (key, defaultValue = null, isSanitize = true) => {
  const paramValue = urlSearchParams.get(key);
  if (paramValue === null || paramValue === undefined) {
    return defaultValue;
  }
  if (isSanitize) {
    return sanitizeURLParam(paramValue);
  }
  return paramValue;
};
