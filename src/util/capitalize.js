/**
 * Capitalize a string.
 * @param {string | null | undefined} value - Ther input string.
 * @returns {string | null} TBD.
 */
export const capitalize = (value) => {
  if (value === null || value === undefined) {
    return null;
  }
  if (!value || value?.length === 0) {
    return value;
  }
  const normValue = value.toLowerCase();
  return normValue.charAt(0).toUpperCase() + normValue.slice(1);
};
