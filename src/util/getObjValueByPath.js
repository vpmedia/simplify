/**
 * Get object value by path.
 * @param {object} obj - TBD.
 * @param {string} path - TBD.
 * @returns {object | null} TBD.
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
