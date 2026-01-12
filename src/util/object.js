/**
 * Purges object properties to free up memory.
 * @param {object} target - The target object.
 */
export const purgeObject = (target) => {
  if (!target) {
    return;
  }
  const reference = target;
  for (const entry of Object.keys(target)) {
    reference[entry] = null;
  }
};

/**
 * Merge two objects.
 * @param {object} target - Target merge object.
 * @param {object} source - Source merge object.
 * @returns {object} Merged result object.
 */
export const deepMerge = (target, source) => {
  if (typeof target !== 'object' || target === null) {
    return source;
  }
  if (typeof source !== 'object' || source === null) {
    return target;
  }
  for (const key of Object.keys(source)) {
    if (key !== '__proto__' && key !== 'constructor') {
      if (typeof source[key] === 'object' && source[key] !== null) {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Returns the sum value of an array of objects field.
 * @param {object[]} arr - The list of input objects.
 * @param {string} prop - The object property key.
 * @returns {number} The sum value.
 */
export const getObjArrayPropSum = (arr, prop) => {
  return arr.reduce((accumulator, object) => {
    return accumulator + object[prop];
  }, 0);
};

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
  const [nextKey] = keyParts;
  if (keyParts.length === 1) {
    return obj[nextKey] === undefined ? null : obj[nextKey];
  }
  if (obj[nextKey] === undefined || obj[nextKey] === null) {
    return null;
  }
  return getObjValueByPath(obj[nextKey], keyParts.slice(1).join('.'));
};

/**
 * Set object value by path.
 * @param {object} obj - The source object to set the value in.
 * @param {string} path - The path to the property in dot notation (e.g. 'a.b.c').
 * @param {object | null | undefined} value - The value to set at the specified path.
 * @throws {SyntaxError} Error when illegal path value has been provided.
 */
export const setObjValueByPath = (obj, path, value) => {
  if (!obj || !path) {
    return;
  }
  const keyParts = path.split('.');
  const [nextKey] = keyParts;
  if (nextKey === '__proto__') {
    throw new SyntaxError('Security violation error. Cannot use "__proto__" as parameter.');
  }
  if (keyParts.length === 1) {
    obj[nextKey] = value;
  } else {
    // Create the nested object if it doesn't exist
    if (obj[nextKey] === undefined || obj[nextKey] === null) {
      obj[nextKey] = {};
    }
    setObjValueByPath(obj[nextKey], keyParts.slice(1).join('.'), value);
  }
};
