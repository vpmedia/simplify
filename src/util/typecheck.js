import { isArrayOf } from './validate.js';

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
