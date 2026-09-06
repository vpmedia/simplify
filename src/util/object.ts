const PROHIBITED_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

type AnyRecord = Record<string, unknown>;

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
    const sourceValue = source[key];
    if (typeof sourceValue === 'object' && sourceValue !== null) {
      const targetValue = target[key];
      const branch = typeof targetValue === 'object' && targetValue !== null ? (targetValue as AnyRecord) : {};
      target[key] = branch;
      deepMerge(branch, sourceValue as AnyRecord);
    } else {
      target[key] = sourceValue;
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
  const nextValue = obj[nextKey];
  if (keyParts.length === 1) {
    return nextValue === undefined ? null : nextValue;
  }
  if (nextValue === undefined || nextValue === null) {
    return null;
  }
  return getObjValueByPath(nextValue as AnyRecord, keyParts.slice(1).join('.'));
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
    obj[nextKey] ??= {};
    setObjValueByPath(obj[nextKey] as AnyRecord, keyParts.slice(1).join('.'), value);
  }
};
