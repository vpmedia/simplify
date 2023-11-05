/**
 * Get object value by path.
 * @param {object} obj - TBD.
 * @param {string} path - TBD.
 * @param {*} value - TBD.
 */
export function setObjValueByPath(obj, path, value) {
  if (!obj || !path) {
    return;
  }
  const keyParts = path.split('.');
  const nextKey = keyParts[0];
  if (keyParts.length === 1) {
    obj[nextKey] = value;
  }
  setObjValueByPath(obj[nextKey], keyParts.slice(1).join('.'), value);
}
