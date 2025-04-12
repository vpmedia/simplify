import { underscoreToCamelCase } from './underscoreToCamelCase.js';

/**
 * Maps server data to client data.
 * @param {object} data - The server input data.
 * @returns {object} The output data.
 */
export const serverDataToState = (data) => {
  const result = {};
  for (const serverKey of Object.keys(data)) {
    const clientKey = underscoreToCamelCase(serverKey);
    result[clientKey] = data[serverKey];
  }
  return result;
};
