import { TypeCheckError } from './TypeCheckError.js';
import { Logger } from '../logging/Logger.js';
import { typeCheck, typeCheckArray, typeCheckEnum } from './util.js';

const logger = new Logger('typechecker');

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

  /**
   * Type check an array of values.
   * @template T
   * @param {string | number} value - The value to check.
   * @param {(string | number)[] | Set<string | number> | Record<string | number, string | number>} choices - Enum list.
   * @returns {string | number} - The type checked value.
   */
  checkEnum(value, choices) {
    try {
      return typeCheckEnum(value, choices);
    } catch (error) {
      if (this.#swallowErrors && error instanceof TypeCheckError) {
        logger.exception('checkEnum', error);
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
