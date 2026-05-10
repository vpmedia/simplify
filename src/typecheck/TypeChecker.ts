import { Logger } from '../logging/Logger.js';
import { TypeCheckError } from './TypeCheckError.js';
import { typeCheck, typeCheckArray, typeCheckEnum, type EnumChoices } from './util.js';

const logger = new Logger('typechecker');

class TypeChecker {
  static #instance: TypeChecker | undefined;

  #swallowErrors = false;

  constructor() {
    if (TypeChecker.#instance === undefined) {
      TypeChecker.#instance = this;
    }
  }

  /**
   * Enable or disable swallowing of TypeCheckErrors.
   */
  setSwallowErrors(value: boolean): void {
    this.#swallowErrors = Boolean(value);
  }

  /**
   * Type check a single value.
   */
  check<T>(value: unknown, validator: (value: unknown) => value is T): T {
    try {
      return typeCheck(value, validator);
    } catch (error) {
      if (this.#swallowErrors && error instanceof TypeCheckError) {
        logger.exception('check', error);
        return value as T;
      }
      throw error;
    }
  }

  /**
   * Type check an array of values.
   */
  checkArray<T>(value: unknown[], validator: (value: unknown) => value is T): T[] {
    try {
      return typeCheckArray(value, validator);
    } catch (error) {
      if (this.#swallowErrors && error instanceof TypeCheckError) {
        logger.exception('checkArray', error);
        return value as T[];
      }
      throw error;
    }
  }

  /**
   * Type check an enum.
   */
  checkEnum(value: string | number, choices: EnumChoices): string | number {
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
