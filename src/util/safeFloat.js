/**
 * Convenience method for floating point precision handling.
 * @param {number} value - The number to process.
 * @param {number} p - The precision. Defaults to 2.
 * @returns {number} The processed value.
 */
export function fixFloat(value, p = 2) {
  return Number.parseFloat(value.toFixed(p));
}

/**
 * Adds two value with floating point precision.
 * @param {number} a - The number a.
 * @param {number} b - The number b.
 * @returns {number} The processed value.
 */
export function addFloat(a, b) {
  const p = 100;
  return fixFloat((a * p + b * p) / p);
}

/**
 * Substracts two value with floating point precision.
 * @param {number} a - The number a.
 * @param {number} b - The number b.
 * @returns {number} The processed value.
 */
export function subFloat(a, b) {
  const p = 100;
  return fixFloat((a * p - b * p) / p);
}
