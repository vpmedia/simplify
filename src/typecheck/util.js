import { getTypeFromValue } from '../util/string.js';
import { isArrayOf, isEnum } from '../util/validate.js';
import { TypeCheckError } from './TypeCheckError.js';

const VALIDATOR_FALLBACK_NAME = '<anonymous>';

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
    const validatorName = validator.name || VALIDATOR_FALLBACK_NAME;
    const displayValue = getTypeFromValue(value);
    throw new TypeCheckError(`Validation failed: ${validatorName} (${displayValue})`);
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
    const validatorName = validator.name || VALIDATOR_FALLBACK_NAME;
    const displayValue = getTypeFromValue(value);
    throw new TypeCheckError(`Validation failed: ${validatorName} (${displayValue})`);
  }
  return value;
};

/**
 * Type check an enum.
 * @param {string | number} value - The value to check.
 * @param {(string | number)[] | Set<string | number> | Record<string | number, string | number>} choices - Enum list.
 * @returns {string | number} The type checked value.
 * @throws {TypeCheckError}
 */
export const typeCheckEnum = (value, choices) => {
  if (!isEnum(value, choices)) {
    const validatorName = 'isEnum';
    const displayValue = getTypeFromValue(value);
    throw new TypeCheckError(`Validation failed: ${validatorName} (${displayValue})`);
  }
  return value;
};
