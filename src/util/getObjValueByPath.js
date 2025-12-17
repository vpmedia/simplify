/**
 * Get object value by path.
 * @param {object} obj - The source object to get the value from.
 * @param {string} path - The path to the property in dot notation (e.g. 'a.b.c').
 * @returns {object | null} The value at the specified path or null if not found.
 */
export const getObjValueByPath = (obj, path) => {
  if (!obj || !path) {
    return null;
  }
  const keyParts = path.split('.');
  const nextKey = keyParts[0];
  if (keyParts.length === 1) {
    return obj[nextKey];
  }
  return getObjValueByPath(obj[nextKey], keyParts.slice(1).join('.'));
};
