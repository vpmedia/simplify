/**
 * TBD.
 * @param {number|string} value - TBD.
 * @param {number} size - TBD.
 * @returns {string} TBD.
 */
export const addLeadingZero = (value, size = 2) => {
  if (value === null || value === undefined) {
    // @ts-ignore: Type 'string | number' is not assignable to type 'string'.
    return value;
  }
  value = value.toString();
  while (value.length < size) {
    value = `0${value}`;
  }
  return value;
};
