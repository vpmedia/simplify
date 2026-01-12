/* eslint-disable jsdoc/reject-any-type */

export class ValidatorError extends TypeError {
  /**
   * Creates a new ValidatorError instance.
   * @param {string} message - Error message.
   */
  constructor(message) {
    super(message);
    this.name = 'ValidatorError';
  }
}

/**
 * Type check a value using a validator.
 * @template T
 * @param {unknown} value - The value to check.
 * @param {(value: unknown) => value is T} validator - The validator to check with.
 * @returns {T} The type checked value.
 * @throws {ValidatorError}
 */
export const typecheck = (value, validator) => {
  if (!validator(value)) {
    const name = validator.name || '<anonymous>';
    const display = typeof value === 'string' ? `"${value}"` : Object.prototype.toString.call(value);
    throw new ValidatorError(`Validation failed: ${name}(${display})`);
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
 * Validates `value` as `object`.
 * @param {unknown} value - Input value.
 * @returns {value is Record<string, unknown>} `true` if `value` is `object` type.
 */
export const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]';

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
    (isObject(choices) && Object.values(choices).includes(value)) ||
    (isInstance(choices, Set) && choices.has(value))
  );
};

/**
 * Type check an array of values using a validator.
 * @template T
 * @param {unknown[]} values - The value to check.
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
 * Type check an object of values using a validator.
 * @template T
 * @param {{[key: string | number]: any}} record - The value to check.
 * @param {(value: unknown) => value is T} validator - The validator to check with.
 * @returns {record is Record<string | number, T>} `true` if `values` has only `validator` checked types.
 */
export const isObjectOf = (record, validator) => {
  if (!isObject(record)) {
    return false;
  }
  for (const value of Object.values(record)) {
    if (!validator(value)) {
      return false;
    }
  }
  return true;
};
