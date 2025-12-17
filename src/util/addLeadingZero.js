/**
 * Add leading zeros to a value to ensure it has a minimum width.
 * @param {number | string | null | undefined} value - The value to pad with leading zeros.
 * @param {number} size - The minimum width of the resulting string.
 * @returns {string | null} The value padded with leading zeros or null if the input is null/undefined.
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
