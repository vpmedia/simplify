/**
 * Converts underscore case string to camel case.
 * @param {string} value - The input string in underscore case.
 * @returns {string} The output string in camel case.
 */
export const underscoreToCamelCase = (value) => {
  return value.replaceAll(/(_\w)/g, (m) => {
    return m[1].toUpperCase();
  });
};
