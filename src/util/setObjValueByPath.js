/**
 * Get object value by path.
 * @param {object} obj - TBD.
 * @param {string} path - TBD.
 * @param {*} value - TBD.
 * @throws {SyntaxError} Error when illegal path value has been provided.
 */
export const setObjValueByPath = (obj, path, value) => {
  if (!obj || !path) {
    return;
  }
  const keyParts = path.split('.');
  const nextKey = keyParts[0];
  if (nextKey === '__proto__') {
    throw new SyntaxError('Security violation error. Cannot use "__proto__" as parameter.');
  }
  if (keyParts.length === 1) {
    obj[nextKey] = value;
  }
  setObjValueByPath(obj[nextKey], keyParts.slice(1).join('.'), value);
};
