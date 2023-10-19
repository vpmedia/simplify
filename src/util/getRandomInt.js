/**
 * Returns random integer in range.
 * @param {number} min - Min value.
 * @param {number} max - Max value.
 * @returns {number} Random integer in given range.
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
