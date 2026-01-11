/* eslint-disable jsdoc/reject-function-type */

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
 * @param {unknown} value - The value to check.
 * @param {(value: unknown) => boolean} validator - The validator to check with.
 */
export const typecheck = (value, validator) => {
  if (validator(value) === false) {
    throw new ValidatorError(`Validation failed with ${validator.name} for ${value}`);
  }
};

/**
 * Validates `value` as `boolean`.
 * @param {unknown} value - Input value.
 * @returns {value is number} `true` if `value` is `boolean` type.
 */
export const isBoolean = (value) => typeof value === 'boolean';

/**
 * Validates `value` as `function`.
 * @param {unknown} value - Input value.
 * @returns {value is Function} `true` if `value` is `function` type.
 */
export const isFunction = (value) => typeof value === 'function';

/**
 * Validates `value` as `number`.
 * @param {unknown} value - Input value.
 * @returns {value is number} `true` if `value` is `number` type.
 */
export const isNumber = (value) => typeof value === 'number';

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
export const isInteger = (value) => typeof value === 'number' && Number.isInteger(value);

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
 * @param {unknown} value - Input value.
 * @returns {value is Array} `true` if `value` is `array` type.
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
 * @returns {value is object} `true` if `value` is `object` type.
 */
export const isObject = (value) => typeof value === 'object' && isArray(value) === false && isNull(value) === false;

/**
 * Validates `value` as `type`
 * @template T
 * @param {unknown} value - The value to test.
 * @param {new (...args: any[]) => T} type - A class or constructor function.
 * @returns {value is T} `true` if `value` is an instance of `type`.
 */
export const isInstance = (value, type) => value instanceof type;

/**
 * Validates `value` as `enum`.
 * @param {unknown} value - Input value.
 * @param {unknown[] | Set<string | number> | {[key: string | number]: unknown}} choices - Input value.
 * @returns {boolean} `true` if `value` is `enum` type.
 */
export const isEnum = (value, choices) => {
  if (isString(value) === false && isNumber(value) === false) {
    return false;
  }
  return (
    (isArray(choices) && choices.includes(value)) ||
    (isObject(choices) && value in choices) ||
    (isInstance(choices, Set) && choices.has(value))
  );
};
