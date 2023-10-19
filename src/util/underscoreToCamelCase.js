/**
 * Converts underscore case string to camel case.
 * @param {string} value - The input string in underscore case.
 * @returns {string} The output string in camel case.
 */
export function underscoreToCamelCase(value) {
  return value.replace(/(_\w)/g, function (m) {
    return m[1].toUpperCase();
  });
}
