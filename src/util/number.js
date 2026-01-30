import { TypeCheckError } from '../typecheck/TypeCheckError.js';

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

const PRECISION = 12;
const EPSILON = 1e-11;

/**
 * Converts degrees to radians.
 * @param {number} degrees - Angle in degrees.
 * @returns {number} Angle in radians.
 * @throws {TypeCheckError}
 */
export const deg2rad = (degrees) => {
  if (!Number.isFinite(degrees)) {
    throw new TypeCheckError('Argument degrees must be a finite number', { value: degrees });
  }
  return degrees * DEG_TO_RAD;
};

/**
 * Converts radians to degrees.
 * @param {number} radians - Angle in radians.
 * @returns {number} Angle in degrees.
 * @throws {TypeCheckError}
 */
export const rad2deg = (radians) => {
  if (!Number.isFinite(radians)) {
    throw new TypeCheckError('Argument radians must be a finite number', { value: radians });
  }
  return radians * RAD_TO_DEG;
};

/**
 * Returns random integer in range.
 * @param {number} min - Min value.
 * @param {number} max - Max value.
 * @returns {number} Random integer in given range.
 * @throws {TypeError}
 */
export const getRandomInt = (min, max) => {
  if (!Number.isFinite(min)) {
    throw new TypeCheckError('Argument min must be finite number', { value: min });
  }
  if (!Number.isFinite(max)) {
    throw new TypeCheckError('Argument max must be finite number', { value: max });
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Normalizes floating point precision (e.g. 0.20000000000000004 → 0.2).
 * @param {number | string} value - Input value.
 * @returns {number} Fixed float precision value.
 */
export const fixFloatPrecision = (value) => {
  const parsedValue = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(parsedValue)) {
    throw new TypeCheckError('Value must be a finite number.', { value });
  }
  return Math.abs(parsedValue) < EPSILON ? 0 : Number(parsedValue.toPrecision(PRECISION));
};

/**
 * Value greater than check.
 * @param {number} value - Input value.
 * @param {number} min - Limit that `value` must be greater than.
 * @returns {boolean} `true` is check success.
 * @private
 */
export const isGreater = (value, min) => value > min;

/**
 * Value greater than check.
 * @param {number} value - Input value.
 * @param {number} min - Limit that `value` must be greater or equal than.
 * @returns {boolean} `true` is check success.
 * @private
 */
export const isGreaterOrEqual = (value, min) => value >= min;

/**
 * Value less than check.
 * @param {number} value - Input value.
 * @param {number} min - Limit that `value` must be greater than.
 * @returns {boolean} `true` is check success.
 * @private
 */
export const isLess = (value, min) => value < min;

/**
 * Value less than check.
 * @param {number} value - Input value.
 * @param {number} min - Limit that `value` must be greater than.
 * @returns {boolean} `true` is check success.
 * @private
 */
export const isLessOrEqual = (value, min) => value <= min;

/**
 * Value greater than check.
 * @param {number} value - Input value.
 * @param {number} min - Limit `value` must be greater or equal than.
 * @param {number} max - Limit `value` must be less or equal than.
 * @returns {boolean} `true` is check success.
 * @private
 */
export const isInRange = (value, min, max) => value >= min && value <= max;

/**
 * Value equal check.
 * @param {number} value - Input value.
 * @param {number} expected - `expected` that `value` must equal.
 * @returns {boolean} `true` is check success.
 * @private
 */
export const isEqual = (value, expected) => value === expected;
