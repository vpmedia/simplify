import { sanitizeURLParam } from './sanitizeURLParam.js';

const urlSearchParams = new URLSearchParams(window.location.search);

/**
 * TBD.
 * @param {string} key - TBD.
 * @param {*} defaultValue - TBD.
 * @param {boolean} isSanitize - TBD.
 * @returns {string} TBD.
 */
export function getURLParam(key, defaultValue = null, isSanitize = true) {
  const paramValue = urlSearchParams.get(key);
  if (paramValue === null || paramValue === undefined) {
    return defaultValue;
  }
  if (isSanitize) {
    return sanitizeURLParam(paramValue);
  }
  return paramValue;
}
