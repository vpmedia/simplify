/**
 * Sanitizes URL parameters allowing only alpha-numeric characters and dash.
 * @param {string} input - The input string to be sanitized.
 * @returns {string} The sanitized output string.
 */
export function sanitizeURLParam(input) {
  if (!input) {
    return input;
  }
  return input.replace(/[^a-zA-Z0-9-_]/gi, '');
}
