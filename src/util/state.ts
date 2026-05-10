import { underscoreToCamelCase } from './string.js';

/**
 * Maps server data to client data.
 */
export const serverDataToState = (data: unknown, isRecursive = false): any => {
  if (Array.isArray(data)) {
    return data.map((entry) => serverDataToState(entry, isRecursive));
  }

  if (data !== null && typeof data === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      const clientKey = underscoreToCamelCase(key);
      result[clientKey] = isRecursive ? serverDataToState(value, isRecursive) : value;
    }
    return result;
  }

  return data;
};
