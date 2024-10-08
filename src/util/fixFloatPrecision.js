/**
 * Fixes floating point number (0.20000000000000004 -> 0.2).
 * @param {number} value - Number to fix.
 * @returns {number} The fixed number.
 */
export function fixFloatPrecision(value) {
  return Number.parseFloat(value.toPrecision(12));
}
