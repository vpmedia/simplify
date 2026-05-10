const PROHIBITED_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

type AnyRecord = Record<string, any>;

/**
 * Purges object properties to free up memory.
 */
export const purgeObject = (target: AnyRecord | null | undefined): void => {
  if (!target) {
    return;
  }
  for (const entry of Object.keys(target)) {
    target[entry] = null;
  }
};

/**
 * Merge two objects.
 */
export const deepMerge = (target: AnyRecord | null, source: AnyRecord | null): AnyRecord | null => {
  if (typeof target !== 'object' || target === null) {
    return source;
  }
  if (typeof source !== 'object' || source === null) {
    return target;
  }
  for (const key of Object.keys(source)) {
    if (PROHIBITED_KEYS.has(key)) {
      throw new SyntaxError(`Security violation error. Cannot use "${key}" as object key.`);
    }
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }

  return target;
};

/**
 * Returns the sum value of an array of objects field.
 */
export const getObjArrayPropSum = (arr: AnyRecord[], prop: string): number =>
  arr.reduce((accumulator, object) => accumulator + (object[prop] as number), 0);

/**
 * Get object value by path.
 */
export const getObjValueByPath = (obj: AnyRecord | null | undefined, path: string | null | undefined): unknown => {
  if (!obj || !path) {
    return null;
  }
  const keyParts = path.split('.');
  const nextKey = keyParts[0]!;
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
 * @throws {SyntaxError} Error when illegal path value has been provided.
 */
export const setObjValueByPath = (
  obj: AnyRecord | null | undefined,
  path: string | null | undefined,
  value: unknown
): void => {
  if (!obj || !path) {
    return;
  }
  const keyParts = path.split('.');
  const nextKey = keyParts[0]!;
  if (PROHIBITED_KEYS.has(nextKey)) {
    throw new SyntaxError(`Security violation error. Cannot use "${nextKey}" as parameter.`);
  }
  if (keyParts.length === 1) {
    obj[nextKey] = value;
  } else {
    if (obj[nextKey] === undefined || obj[nextKey] === null) {
      obj[nextKey] = {};
    }
    setObjValueByPath(obj[nextKey], keyParts.slice(1).join('.'), value);
  }
};
