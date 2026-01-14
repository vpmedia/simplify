/* eslint-disable unicorn/no-useless-undefined */

import { underscoreToCamelCase, capitalize, addLeadingZero, getTypeFromValue, getDisplayValue } from './string.js';

test('Tests add leading zero', () => {
  expect(addLeadingZero(1)).toBe('01');
  expect(addLeadingZero('1')).toBe('01');
  expect(addLeadingZero(1, 3)).toBe('001');
  expect(addLeadingZero('21')).toBe('21');
  expect(addLeadingZero(21)).toBe('21');
  expect(addLeadingZero(null)).toBe(null);
  expect(addLeadingZero(undefined)).toBe(null);
});

describe('capitalize', () => {
  test('Capitalizes first letter of string', () => {
    expect(capitalize('test')).toBe('Test');
    expect(capitalize('TEST')).toBe('Test');
    expect(capitalize('tEST')).toBe('Test');
  });

  test('Handles null input', () => {
    expect(capitalize(null)).toBe(null);
  });

  test('Handles empty string', () => {
    expect(capitalize('')).toBe('');
  });

  test('Handles empty string with whitespace', () => {
    expect(capitalize('   ')).toBe('   ');
  });

  test('Handles single character', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('A')).toBe('A');
  });

  test('Handles strings with numbers', () => {
    expect(capitalize('test123')).toBe('Test123');
  });
});

test('Converts underscore to camelCase', () => {
  expect(underscoreToCamelCase('test')).toBe('test');
  expect(underscoreToCamelCase('test_variable')).toBe('testVariable');
  expect(underscoreToCamelCase('test_variable_name')).toBe('testVariableName');
});

test('getTypeFromValue', () => {
  expect(getTypeFromValue('test')).toBe('string');
  expect(getTypeFromValue(() => null)).toBe('function');
  expect(getTypeFromValue([])).toBe('array');
  expect(getTypeFromValue({})).toBe('object');
  expect(getTypeFromValue(new Date())).toBe('date');
  expect(getTypeFromValue(null)).toBe('null');
  expect(getTypeFromValue(true)).toBe('boolean');
  expect(getTypeFromValue(undefined)).toBe('undefined');
});

test('getDisplayValue', () => {
  expect(getDisplayValue('test')).toBe('"test"');
  expect(getDisplayValue(() => null)).toBe('() => null');
  expect(getDisplayValue([])).toBe('[]');
  expect(getDisplayValue({})).toBe('{}');
  expect(getDisplayValue(new Date())).not.toBe(null);
  expect(getDisplayValue(null)).toBe('null');
  expect(getDisplayValue(true)).toBe('true');
  expect(getDisplayValue(undefined)).toBe('undefined');
});
