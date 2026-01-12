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

/**
 * Capitalize a string.
 * @param {string | null | undefined} value - The input string to capitalize.
 * @returns {string | null} The capitalized string or null if the input is null/undefined.
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

/**
 * Saves text file.
 * @param {string} filename - File name.
 * @param {string} text - File content.
 */
export const saveAsFile = (filename, text) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.append(element);
  element.click();
  element.remove();
};
