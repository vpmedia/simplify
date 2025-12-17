/**
 * Fixes floating point number (0.20000000000000004 -> 0.2).
 * @param {number} value - Number to fix.
 * @returns {number} The fixed number.
 */
export function fixFloatPrecision(value) {
  // Handle string inputs by converting to number first
  if (typeof value === 'string') {
    value = Number(value);
  }
  if (value >= 0 && value < 0.00000000001) {
    const valuePlusOne = value + 1;
    return Number.parseFloat(valuePlusOne.toPrecision(12)) - 1;
  }
  return Number.parseFloat(value.toPrecision(12));
}
