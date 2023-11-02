/**
 * Returns the sum value of an array of objects field.
 * @param {object[]} arr - The list of input objects.
 * @param {string} prop - The object property key.
 * @returns {number} The sum value.
 */
export function getObjArrayPropSum(arr, prop) {
  return arr.reduce((accumulator, object) => {
    return accumulator + object[prop];
  }, 0);
}
