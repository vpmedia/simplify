import { underscoreToCamelCase } from './underscoreToCamelCase.js';

/**
 * Maps server data to client data.
 * @param {object} data - The server input data.
 * @returns {object} The output data.
 */
export const serverDataToState = (data) => {
  if (Array.isArray(data)) {
    return data.map((entry) => serverDataToState(entry));
  }

  if (data !== null && typeof data === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      const clientKey = underscoreToCamelCase(key);
      result[clientKey] = serverDataToState(value);
    }
    return result;
  }

  return data; // Return primitives as-is
};
