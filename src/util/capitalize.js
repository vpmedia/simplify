/**
 * Capitalize a string.
 * @param {string} value - Ther input string.
 * @returns {string} TBD.
 */
export function capitalize(value) {
  if (!value || value.length === 0) {
    return value;
  }
  const normValue = value.toLowerCase();
  return normValue.charAt(0).toUpperCase() + normValue.slice(1);
}
