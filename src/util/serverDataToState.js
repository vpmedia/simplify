import { underscoreToCamelCase } from './underscoreToCamelCase.js';

/**
 * Maps server data to client data.
 * @param {object} data - The server input data.
 * @param {boolean} isRecursive - Use recursive serialization.
 * @returns {object} The output data.
 */
export const serverDataToState = (data, isRecursive = false) => {
  if (Array.isArray(data)) {
    return data.map((entry) => serverDataToState(entry, isRecursive));
  }

  if (data !== null && typeof data === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      const clientKey = underscoreToCamelCase(key);
      result[clientKey] = isRecursive ? serverDataToState(value, isRecursive) : value;
    }
    return result;
  }

  return data; // Return primitives as-is
};
