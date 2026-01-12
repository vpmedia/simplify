/* eslint-disable jsdoc/reject-any-type */
/* eslint-disable jsdoc/no-undefined-types */

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
 * @param {unknown[] | Set<string | number> | {[key: string | number]: unknown}} choices - Input value.
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
 * @param {{[key: string | number]: any}} record - The value to check.
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
 * Logical OR of two validators.
 * @template A, B
 * @param {unknown} value - Input value.
 * @param {(value: unknown) => value is A} a - Validator A.
 * @param {(value: unknown) => value is B} b - Validator B.
 * @returns {value is A | B} `true` if `value` is any of the checked types.
 */
export const isAnyOf = (value, a, b) => a(value) || b(value);

/**
 * Refine a base validator with an extra condition.
 * @template T
 * @param {(value: unknown) => value is T} base - The base validator.
 * @param {(value: T) => boolean} predicate - Extra condition validator.
 * @returns {(value: unknown) => value is T} The refined validator.
 */
// @ts-expect-error
export const isRefined = (base, predicate) => (value) => base(value) && predicate(value);

export const isNumberGreaterThan = (min) => isRefined(isNumber, (value) => value > min);
export const isNumberLessThan = (max) => isRefined(isNumber, (value) => value < max);
export const isNumberInRange = (min, max) => isRefined(isNumber, (value) => value >= min && value <= max);

export const isIntegerGreaterThan = (min) => isRefined(isInteger, (value) => value > min);
export const isIntegerLessThan = (max) => isRefined(isInteger, (value) => value < max);
export const isIntegerInRange = (min, max) => isRefined(isInteger, (value) => value >= min && value <= max);

export const isStringWithMinLength = (min) => isRefined(isString, (value) => value.length >= min);
export const isStringWithMaxLength = (max) => isRefined(isString, (value) => value.length <= max);
export const isStringWithLength = (length) => isRefined(isString, (value) => value.length === length);
export const isStringMatches = (regex) => isRefined(isString, (value) => regex.test(value));

export const isArrayWithMinSize = (min) => isRefined(isArray, (value) => value.length >= min);
export const isArrayWithMaxSize = (max) => isRefined(isArray, (value) => value.length <= max);
export const isArrayWithSize = (size) => isRefined(isArray, (value) => value.length === size);
