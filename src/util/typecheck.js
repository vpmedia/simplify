import { Logger } from '../logging/Logger.js';
import { isArrayOf } from './validate.js';

const logger = new Logger('typecheck');

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

class TypeChecker {
  /** @type {TypeChecker} */
  static #instance;

  /** @type {boolean} */
  #swallowErrors = false;

  constructor() {
    if (TypeChecker.#instance === undefined) {
      TypeChecker.#instance = this;
    }
  }

  /**
   * Enable or disable swallowing of TypeCheckErrors.
   * @param {boolean} value - Swallow errors flag.
   */
  setSwallowErrors(value) {
    this.#swallowErrors = Boolean(value);
  }

  /**
   * Type check a single value.
   * @template T
   * @param {unknown} value - The value to check.
   * @param {(value: unknown) => value is T} validator - The validator to check with.
   * @returns {T} - The type checked value.
   */
  check(value, validator) {
    try {
      return typeCheck(value, validator);
    } catch (error) {
      if (this.#swallowErrors && error instanceof TypeCheckError) {
        logger.exception('check', error);
        // @ts-expect-error
        return value;
      }
      throw error;
    }
  }

  /**
   * Type check an array of values.
   * @template T
   * @param {unknown[]} value - The value to check.
   * @param {(value: unknown) => value is T} validator - The validator to check the array with.
   * @returns {T[]} - The type checked value.
   */
  checkArray(value, validator) {
    try {
      return typeCheckArray(value, validator);
    } catch (error) {
      if (this.#swallowErrors && error instanceof TypeCheckError) {
        logger.exception('checkArray', error);
        // @ts-expect-error
        return value;
      }
      throw error;
    }
  }
}

/**
 * Export a single shared instance.
 */
export const typeChecker = new TypeChecker();
