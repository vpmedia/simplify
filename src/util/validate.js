/* eslint-disable jsdoc/reject-any-type, jsdoc/no-undefined-types */

import { isEqual, isGreater, isGreaterOrEqual, isInRange, isLess, isLessOrEqual } from './number.js';

/**
 * Validates `value` as `boolean`.
 * @param {unknown} value - Input value.
 * @returns {value is boolean} `true` if `value` is `boolean` type.
 */
export const isBoolean = (value) => typeof value === 'boolean';

/**
 * Validates `value` as `function`.
 * @param {unknown} value - Input value.
 * @returns {value is (...args: any[]) => any} `true` if `value` is `function` type.
 */
export const isFunction = (value) => typeof value === 'function';

/**
 * Validates `value` as `number`.
 * @param {unknown} value - Input value.
 * @returns {value is number} `true` if `value` is `number` type.
 */
export const isNumber = (value) => typeof value === 'number' && Number.isFinite(value);

/**
 * Validates `value` as positive `number`.
 * @param {unknown} value - Input value.
 * @returns {value is number} `true` if `value` is `number` type with positive value.
 */
export const isPositiveNumber = (value) => isNumber(value) && value > 0;

/**
 * Validates `value` as non-negative `number`.
 * @param {unknown} value - Input value.
 * @returns {value is number} `true` if `value` is `number` type with non-negative value.
 */
export const isNonNegativeNumber = (value) => isNumber(value) && value >= 0;

/**
 * Validates `value` as `integer`.
 * @param {unknown} value - Input value.
 * @returns {value is number} `true` if `value` is `integer` type.
 */
export const isInteger = (value) => isNumber(value) && Number.isInteger(value);

/**
 * Validates `value` as positive `integer`.
 * @param {unknown} value - Input value.
 * @returns {value is number} `true` if `value` is `integer` type with positive value.
 */
export const isPositiveInteger = (value) => isInteger(value) && value > 0;

/**
 * Validates `value` as non-negative `integer`.
 * @param {unknown} value - Input value.
 * @returns {value is number} `true` if `value` is `integer` type with non-negative value.
 */
export const isNonNegativeInteger = (value) => isInteger(value) && value >= 0;

/**
 * Validates `value` as `string`.
 * @param {unknown} value - Input value.
 * @returns {value is string} `true` if `value` is `string` type.
 */
export const isString = (value) => typeof value === 'string';

/**
 * Validates `value` as `array`.
 * @template T
 * @param {unknown} value - Input value.
 * @returns {value is T[]} `true` if `value` is `array` type.
 */
export const isArray = (value) => Array.isArray(value);

/**
 * Validates `value` as `null`
 * @param {unknown} value - Input value.
 * @returns {value is null} `true` if `value` is `null` type.
 */
export const isNull = (value) => value === null;

/**
 * Validates `value` as `undefined`
 * @param {unknown} value - Input value.
 * @returns {value is undefined} `true` if `value` is `undefined` type.
 */
export const isUndefined = (value) => value === undefined;

/**
 * Validates `value` as `null` or `undefined`
 * @param {unknown} value - Input value.
 * @returns {value is null | undefined} `true` if `value` is `null` or `undefined` type.
 */
export const isNullOrUndefined = (value) => isNull(value) || isUndefined(value);

/**
 * Validates `value` as plain `object`.
 * @param {unknown} value - Input value.
 * @returns {value is Record<string, unknown>} `true` if `value` is `object` type.
 */
export const isPlainObject = (value) => Object.prototype.toString.call(value) === '[object Object]';

/**
 * Validates `value` as `type`
 * @template T
 * @param {unknown} value - The value to test.
 * @param {new (...args: any[]) => T} type - A class or constructor function.
 * @returns {value is T} `true` if `value` is an instance of `type`.
 */
export const isInstance = (value, type) => isFunction(type) && value instanceof type;

/**
 * Validates `value` as `enum`.
 * @param {unknown} value - Input value.
 * @param {unknown[] | Set<string | number> | Record<string | number, unknown>} choices - Input value.
 * @returns {boolean} `true` if `value` is `enum` type.
 */
export const isEnum = (value, choices) => {
  if (!isString(value) && !isNumber(value)) {
    return false;
  }
  return (
    (isArray(choices) && choices.includes(value)) ||
    (isPlainObject(choices) && Object.values(choices).includes(value)) ||
    (isInstance(choices, Set) && choices.has(value))
  );
};

/**
 * Type check an array of values using a validator.
 * @template T
 * @param {unknown} values - The value to check.
 * @param {(value: unknown) => value is T} validator - The validator to check with.
 * @returns {values is T[]} `true` if `values` has only `validator` checked types.
 */
export const isArrayOf = (values, validator) => {
  if (!isArray(values)) {
    return false;
  }
  for (const value of values) {
    if (!validator(value)) {
      return false;
    }
  }
  return true;
};

/**
 * Type check a plain object of values using a validator.
 * @template T
 * @param {Record<string | number, unknown>} record - The value to check.
 * @param {(value: unknown) => value is T} validator - The validator to check with.
 * @returns {record is Record<string | number, T>} `true` if `values` has only `validator` checked types.
 */
export const isPlainObjectOf = (record, validator) => {
  if (!isPlainObject(record)) {
    return false;
  }
  for (const value of Object.values(record)) {
    if (!validator(value)) {
      return false;
    }
  }
  return true;
};

/**
 * Refine a base validator with an extra condition.
 * @template T
 * @param {(value: unknown) => value is T} base - The base validator.
 * @param {(value: T) => boolean} predicate - Extra condition validator.
 * @param {string | null} name - Refined validator name.
 * @returns {(value: unknown) => value is T} The refined validator.
 */
export const refineValidator = (base, predicate, name = null) => {
  const refinedValidator = (value) => base(value) && predicate(value);
  Object.defineProperty(refinedValidator, 'name', {
    value: isString(name) ? name : `${base.name}Refined`,
  });
  // @ts-expect-error
  return refinedValidator;
};

//
// Refined validators
//

/**
 * Logical OR of two validators.
 * @template A, B
 * @param {(value: unknown) => value is A} a - Validator A.
 * @param {(value: unknown) => value is B} b - Validator B.
 * @returns {(value: unknown) => value is A | B} `true` if `value` is any of the checked types.
 */
export const isAnyOf = (a, b) => (value) => a(value) || b(value);

export const isNumberGreater = (min) => refineValidator(isNumber, (value) => isGreater(value, min));
export const isNumberGreaterOrEqual = (min) => refineValidator(isNumber, (value) => isGreaterOrEqual(value, min));
export const isNumberLess = (min) => refineValidator(isNumber, (value) => isLess(value, min));
export const isNumberLessOrEqual = (min) => refineValidator(isNumber, (value) => isLessOrEqual(value, min));
export const isNumberInRange = (min, max) => refineValidator(isNumber, (value) => isInRange(value, min, max));
export const isNumberEqual = (expected) => refineValidator(isNumber, (value) => isEqual(value, expected));

export const isIntegerGreater = (min) => refineValidator(isInteger, (value) => isGreater(value, min));
export const isIntegerGreaterOrEqual = (min) => refineValidator(isInteger, (value) => isGreaterOrEqual(value, min));
export const isIntegerLess = (min) => refineValidator(isInteger, (value) => isLess(value, min));
export const isIntegerLessOrEqual = (min) => refineValidator(isInteger, (value) => isLessOrEqual(value, min));
export const isIntegerInRange = (min, max) => refineValidator(isInteger, (value) => isInRange(value, min, max));
export const isIntegerEqual = (expected) => refineValidator(isInteger, (value) => isEqual(value, expected));

export const isStringLengthGreater = (min) => refineValidator(isString, (value) => isGreater(value.length, min));
export const isStringLengthGreaterOrEqual = (min) =>
  refineValidator(isString, (value) => isGreaterOrEqual(value.length, min));
export const isStringLengthLess = (min) => refineValidator(isString, (value) => isLess(value.length, min));
export const isStringLengthLessOrEqual = (min) =>
  refineValidator(isString, (value) => isLessOrEqual(value.length, min));
export const isStringLengthInRange = (min, max) =>
  refineValidator(isString, (value) => isInRange(value.length, min, max));
export const isStringLengthEqual = (expected) => refineValidator(isString, (value) => isEqual(value.length, expected));

export const isArrayLengthGreater = (min) => refineValidator(isArray, (value) => isGreater(value.length, min));
export const isArrayLengthGreaterOrEqual = (min) =>
  refineValidator(isArray, (value) => isGreaterOrEqual(value.length, min));
export const isArrayLengthLess = (min) => refineValidator(isArray, (value) => isLess(value.length, min));
export const isArrayLengthLessOrEqual = (min) => refineValidator(isArray, (value) => isLessOrEqual(value.length, min));
export const isArrayLengthInRange = (min, max) =>
  refineValidator(isArray, (value) => isInRange(value.length, min, max));
export const isArrayLengthEqual = (expected) => refineValidator(isArray, (value) => isEqual(value.length, expected));

export class TypeCheckError extends TypeError {
  /**
   * Creates a new `TypeCheckError` instance.
   * @param {string} message - Error message.
   */
  constructor(message) {
    super(message);
    this.name = 'TypeCheckError';
  }
}

/**
 * Type check a value using a validator.
 * @template T
 * @param {unknown} value - The value to check.
 * @param {(value: unknown) => value is T} validator - The validator to check with.
 * @returns {T} The type checked value.
 * @throws {TypeCheckError}
 */
export const typeCheck = (value, validator) => {
  if (!validator(value)) {
    const name = validator.name || '<anonymous>';
    const display = typeof value === 'string' ? `"${value}"` : Object.prototype.toString.call(value);
    throw new TypeCheckError(`Validation failed: ${name} (${display})`);
  }
  return value;
};

/**
 * Type check a value using a validator.
 * @template T
 * @param {unknown[]} value - The value to check.
 * @param {(value: unknown) => value is T} validator - The validator to check the array with.
 * @returns {T[]} The type checked value.
 * @throws {TypeCheckError}
 */
export const typeCheckArray = (value, validator) => {
  if (!isArrayOf(value, validator)) {
    const name = validator.name || '<anonymous>';
    const display = typeof value === 'string' ? `"${value}"` : Object.prototype.toString.call(value);
    throw new TypeCheckError(`Validation failed: ${name} (${display})`);
  }
  return value;
};
