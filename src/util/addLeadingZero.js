/**
 * TBD.
 * @param {number | string | null | undefined} value - TBD.
 * @param {number} size - TBD.
 * @returns {string | null} TBD.
 */
export const addLeadingZero = (value, size = 2) => {
  if (value === null || value === undefined) {
    return null;
  }
  value = value.toString();
  while (value.length < size) {
    value = `0${value}`;
  }
  return value;
};
