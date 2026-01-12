/**
 * Converts degrees to radians.
 * @param {number} deg - Degree value.
 * @returns {number} Radian value.
 */
export const deg2rad = (deg) => deg * (Math.PI / 180);

/**
 * Returns random integer in range.
 * @param {number} min - Min value.
 * @param {number} max - Max value.
 * @returns {number} Random integer in given range.
 */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Fixes floating point number (0.20000000000000004 -> 0.2).
 * @param {number | string} value - Number to fix.
 * @returns {number} The fixed number.
 */
export const fixFloatPrecision = (value) => {
  // Handle string inputs by converting to number first
  if (typeof value === 'string') {
    value = Number(value);
  }
  if (value >= 0 && value < 0.00000000001) {
    const valuePlusOne = value + 1;
    return Number.parseFloat(valuePlusOne.toPrecision(12)) - 1;
  }
  return Number.parseFloat(value.toPrecision(12));
};

/**
 * Convenience method for floating point precision handling.
 * @param {number} value - The number to process.
 * @param {number} p - The precision. Defaults to 2.
 * @returns {number} The processed value.
 */
export const fixFloat = (value, p = 2) => Number.parseFloat(value.toFixed(p));

/**
 * Adds two value with floating point precision.
 * @param {number} a - The number a.
 * @param {number} b - The number b.
 * @returns {number} The processed value.
 */
export const addFloat = (a, b) => {
  const p = 100;
  return fixFloat((a * p + b * p) / p);
};

/**
 * Substracts two value with floating point precision.
 * @param {number} a - The number a.
 * @param {number} b - The number b.
 * @returns {number} The processed value.
 */
export const subFloat = (a, b) => {
  const p = 100;
  return fixFloat((a * p - b * p) / p);
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
