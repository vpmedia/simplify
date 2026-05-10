import { getDisplayValue, getTypeFromValue } from '../util/string.js';
import { isArrayOf, isEnum } from '../util/validate.js';
import { TypeCheckError } from './TypeCheckError.js';

export type EnumChoices =
  | ReadonlyArray<string | number>
  | ReadonlySet<string | number>
  | Readonly<Record<string | number, string | number>>;

/**
 * Get error message for validator exceptions.
 */
const getErrorMessage = (validatorName: string, value: unknown): never => {
  const displayValue = getDisplayValue(value);
  const displayType = getTypeFromValue(value);
  throw new TypeCheckError(`Validation failed: ${validatorName || '<anonymous>'} - ${displayValue} (${displayType})`);
};

/**
 * Type check a value using a validator.
 * @throws {TypeCheckError}
 */
export const typeCheck = <T>(value: unknown, validator: (value: unknown) => value is T): T => {
  if (!validator(value)) {
    getErrorMessage(validator.name, value);
  }
  return value as T;
};

/**
 * Type check an array of values using a validator.
 * @throws {TypeCheckError}
 */
export const typeCheckArray = <T>(value: unknown[], validator: (value: unknown) => value is T): T[] => {
  if (!isArrayOf(value, validator)) {
    getErrorMessage(validator.name, value);
  }
  return value as T[];
};

/**
 * Type check an enum.
 * @throws {TypeCheckError}
 */
export const typeCheckEnum = (value: string | number, choices: EnumChoices): string | number => {
  if (!isEnum(value, choices)) {
    getErrorMessage('isEnum', value);
  }
  return value;
};
