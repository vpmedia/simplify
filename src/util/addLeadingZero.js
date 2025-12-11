/**
 * TBD.
 * @param {number|string} value - TBD.
 * @param {number} size - TBD.
 * @returns {string} TBD.
 */
export const addLeadingZero = (value, size = 2) => {
  if (value === null || value === undefined) {
    // @ts-expect-error
    return value;
  }
  value = value.toString();
  while (value.length < size) {
    value = `0${value}`;
  }
  return value;
};
