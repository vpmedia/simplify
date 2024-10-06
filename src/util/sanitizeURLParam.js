/**
 * Sanitizes URL parameters allowing only alpha-numeric characters and dash.
 * @param {string} input - The input string to be sanitized.
 * @returns {string} The sanitized output string.
 */
export const sanitizeURLParam = (input) => {
  if (!input) {
    return input;
  }
  return input.replaceAll(/[^\w-]/gi, '');
};
