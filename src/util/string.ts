/**
 * Add leading zeros to a value to ensure it has a minimum width.
 */
export const addLeadingZero = (value: number | string | null | undefined, size = 2): string | null => {
  if (value === null || value === undefined) {
    return null;
  }
  let str = value.toString();
  while (str.length < size) {
    str = `0${str}`;
  }
  return str;
};

/**
 * Capitalize a string.
 */
export const capitalize = (value: string | null | undefined): string | null => {
  if (value === null || value === undefined) {
    return null;
  }
  if (!value || value.length === 0) {
    return value;
  }
  const normValue = value.toLowerCase();
  return normValue.charAt(0).toUpperCase() + normValue.slice(1);
};

/**
 * Converts underscore case string to camel case.
 */
export const underscoreToCamelCase = (value: string): string =>
  value.replaceAll(/(_\w)/gu, (m) => m[1]!.toUpperCase());

/**
 * Saves text file.
 */
export const saveAsFile = (filename: string, text: string): void => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.append(element);
  element.click();
  element.remove();
};

/**
 * Get type from value in human readable format.
 */
export const getTypeFromValue = (value: unknown): string =>
  Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

/**
 * Get value in human readable format.
 */
export const getDisplayValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
};
