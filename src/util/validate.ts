import { isEqual, isGreater, isGreaterOrEqual, isInRange, isLess, isLessOrEqual } from './number.js';

export type Validator<T> = (value: unknown) => value is T;

/**
 * Validates `value` as `boolean`.
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

/**
 * Validates `value` as `number`.
 */
export const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

/**
 * Validates `value` as positive `number`.
 */
export const isPositiveNumber = (value: unknown): value is number => isNumber(value) && value > 0;

/**
 * Validates `value` as non-negative `number`.
 */
export const isNonNegativeNumber = (value: unknown): value is number => isNumber(value) && value >= 0;

/**
 * Validates `value` as `integer`.
 */
export const isInteger = (value: unknown): value is number => isNumber(value) && Number.isInteger(value);

/**
 * Validates `value` as positive `integer`.
 */
export const isPositiveInteger = (value: unknown): value is number => isInteger(value) && value > 0;

/**
 * Validates `value` as non-negative `integer`.
 */
export const isNonNegativeInteger = (value: unknown): value is number => isInteger(value) && value >= 0;

/**
 * Validates `value` as `string`.
 */
export const isString = (value: unknown): value is string => typeof value === 'string';

/**
 * Validates `value` as `array`.
 */
export const isArray = <T = unknown>(value: unknown): value is T[] => Array.isArray(value);

/**
 * Validates `value` as `null`.
 */
export const isNull = (value: unknown): value is null => value === null;

/**
 * Validates `value` as `undefined`.
 */
export const isUndefined = (value: unknown): value is undefined => value === undefined;

/**
 * Validates `value` as `null` or `undefined`.
 */
export const isNullOrUndefined = (value: unknown): value is null | undefined => isNull(value) || isUndefined(value);

/**
 * Validates `value` as plain `object`.
 */
export const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Object.prototype.toString.call(value) === '[object Object]';

/**
 * Validates `value` as `function`.
 */
export const isFunction = (value: unknown): value is (...args: any[]) => any => typeof value === 'function';

/**
 * Validates `value` as `type`.
 */
export const isInstance = <T>(value: unknown, type: new (...args: any[]) => T): value is T =>
  isFunction(type) && value instanceof type;

/**
 * Validates `value` as `enum`.
 */
export const isEnum = (
  value: unknown,
  choices:
    | ReadonlyArray<string | number>
    | ReadonlySet<string | number>
    | Readonly<Record<string | number, string | number>>
    | null
    | undefined
): boolean => {
  if (!isString(value) && !isNumber(value)) {
    return false;
  }
  return (
    (isArray<string | number>(choices) && choices.includes(value)) ||
    (isPlainObject(choices) && Object.values(choices).includes(value)) ||
    (isInstance(choices, Set) && (choices as Set<string | number>).has(value))
  );
};

/**
 * Type check an array of values using a validator.
 */
export const isArrayOf = <T>(values: unknown, validator: Validator<T>): values is T[] => {
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
 */
export const isPlainObjectOf = <T>(
  record: unknown,
  validator: Validator<T>
): record is Record<string | number, T> => {
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
 * Refine a base validator with an extra condition.
 */
export const refineValidator = <T>(
  base: Validator<T>,
  predicate: (value: T) => boolean,
  name: string | null = null
): Validator<T> => {
  const refinedValidator = (value: unknown): value is T => base(value) && predicate(value as T);
  Object.defineProperty(refinedValidator, 'name', {
    value: isString(name) ? name : `${base.name}Refined`,
  });
  return refinedValidator;
};

/**
 * Logical OR of two validators.
 */
export const isAnyOf =
  <A, B>(a: Validator<A>, b: Validator<B>): Validator<A | B> =>
  (value: unknown): value is A | B =>
    a(value) || b(value);

export const isNumberGreater = (min: number): Validator<number> =>
  refineValidator(isNumber, (value) => isGreater(value, min));

export const isNumberGreaterOrEqual = (min: number): Validator<number> =>
  refineValidator(isNumber, (value) => isGreaterOrEqual(value, min));

export const isNumberLess = (min: number): Validator<number> =>
  refineValidator(isNumber, (value) => isLess(value, min));

export const isNumberLessOrEqual = (min: number): Validator<number> =>
  refineValidator(isNumber, (value) => isLessOrEqual(value, min));

export const isNumberInRange = (min: number, max: number): Validator<number> =>
  refineValidator(isNumber, (value) => isInRange(value, min, max));

export const isNumberEqual = (expected: number): Validator<number> =>
  refineValidator(isNumber, (value) => isEqual(value, expected));

export const isIntegerGreater = (min: number): Validator<number> =>
  refineValidator(isInteger, (value) => isGreater(value, min));

export const isIntegerGreaterOrEqual = (min: number): Validator<number> =>
  refineValidator(isInteger, (value) => isGreaterOrEqual(value, min));

export const isIntegerLess = (min: number): Validator<number> =>
  refineValidator(isInteger, (value) => isLess(value, min));

export const isIntegerLessOrEqual = (min: number): Validator<number> =>
  refineValidator(isInteger, (value) => isLessOrEqual(value, min));

export const isIntegerInRange = (min: number, max: number): Validator<number> =>
  refineValidator(isInteger, (value) => isInRange(value, min, max));

export const isIntegerEqual = (expected: number): Validator<number> =>
  refineValidator(isInteger, (value) => isEqual(value, expected));

export const isStringLengthGreater = (min: number): Validator<string> =>
  refineValidator(isString, (value) => isGreater(value.length, min));

export const isStringLengthGreaterOrEqual = (min: number): Validator<string> =>
  refineValidator(isString, (value) => isGreaterOrEqual(value.length, min));

export const isStringLengthLess = (min: number): Validator<string> =>
  refineValidator(isString, (value) => isLess(value.length, min));

export const isStringLengthLessOrEqual = (min: number): Validator<string> =>
  refineValidator(isString, (value) => isLessOrEqual(value.length, min));

export const isStringLengthInRange = (min: number, max: number): Validator<string> =>
  refineValidator(isString, (value) => isInRange(value.length, min, max));

export const isStringLengthEqual = (expected: number): Validator<string> =>
  refineValidator(isString, (value) => isEqual(value.length, expected));

export const isArrayLengthGreater = (min: number): Validator<unknown[]> =>
  refineValidator(isArray, (value) => isGreater(value.length, min));

export const isArrayLengthGreaterOrEqual = (min: number): Validator<unknown[]> =>
  refineValidator(isArray, (value) => isGreaterOrEqual(value.length, min));

export const isArrayLengthLess = (min: number): Validator<unknown[]> =>
  refineValidator(isArray, (value) => isLess(value.length, min));

export const isArrayLengthLessOrEqual = (min: number): Validator<unknown[]> =>
  refineValidator(isArray, (value) => isLessOrEqual(value.length, min));

export const isArrayLengthInRange = (min: number, max: number): Validator<unknown[]> =>
  refineValidator(isArray, (value) => isInRange(value.length, min, max));

export const isArrayLengthEqual = (expected: number): Validator<unknown[]> =>
  refineValidator(isArray, (value) => isEqual(value.length, expected));
