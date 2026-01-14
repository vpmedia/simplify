import { getDisplayValue, getTypeFromValue } from '../util/string.js';
import { isArrayOf, isEnum } from '../util/validate.js';
import { TypeCheckError } from './TypeCheckError.js';

/**
 * Get error message for validator exceptions.
 * @param {string} validatorName - Validator name.
 * @param {unknown} value - Input value.
 */
const getErrorMessage = (validatorName, value) => {
  const displayValue = getDisplayValue(value);
  const displayType = getTypeFromValue(value);
  throw new TypeCheckError(`Validation failed: ${validatorName || '<anonymous>'} - ${displayValue} (${displayType})`);
};
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
    const errorMessage = getErrorMessage(validator.name, value);
    throw new TypeCheckError(errorMessage);
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
    const errorMessage = getErrorMessage(validator.name, value);
    throw new TypeCheckError(errorMessage);
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
    const errorMessage = getErrorMessage('isEnum', value);
    throw new TypeCheckError(errorMessage);
  }
  return value;
};
