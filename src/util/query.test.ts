/**
 * @vitest-environment-options { "url": "https://localhost/app/?language=en&token=123-456-öüó%24D" }
 */

import { getURLParam, sanitizeURLParam } from './query.js';

describe('getURLParam', () => {
  test('Returns fallback value when parameter is not found', () => {
    const result = getURLParam('nonexistent', 'fallback');
    expect(result).toBe('fallback');
  });

  test('Handles null/undefined input gracefully', () => {
    const result = getURLParam(null, 'fallback');
    expect(result).toBe('fallback');
  });

  test('Returns default value when param is null', () => {
    const result = getURLParam('key', 'default');
    expect(result).toBe('default');
  });

  test('Handles valid url parameter sanitized', () => {
    expect(getURLParam('language')).toBe('en');
    expect(getURLParam('token')).toBe('123-456-D');
  });

  test('Handles valid url parameter unsanitized', () => {
    expect(getURLParam('token', null, false)).toBe('123-456-öüó$D');
  });
});

describe('sanitizeURLParam', () => {
  test('Sanitizes URL parameter correctly', () => {
    expect(sanitizeURLParam('abc<>-123[]{}-()A_BC')).toBe('abc-123-A_BC');
  });

  test('Handles null input', () => {
    expect(sanitizeURLParam(null)).toBe(null);
  });

  test('Handles empty string', () => {
    expect(sanitizeURLParam('')).toBe('');
  });

  test('Handles valid characters', () => {
    expect(sanitizeURLParam('abc123')).toBe('abc123');
    expect(sanitizeURLParam('test-parameter')).toBe('test-parameter');
    expect(sanitizeURLParam('test_parameter')).toBe('test_parameter');
  });

  test('Handles special characters', () => {
    expect(sanitizeURLParam('test@#$%')).toBe('test');
    expect(sanitizeURLParam('test!@#$%^&*()')).toBe('test');
  });

  test('Handles unicode characters', () => {
    expect(sanitizeURLParam('test_äöü')).toBe('test_');
  });

  test('Handles edge cases with various special characters', () => {
    expect(sanitizeURLParam('test!!!@@@')).toBe('test');
    expect(sanitizeURLParam('test_param-123')).toBe('test_param-123');
    expect(sanitizeURLParam('test param')).toBe('testparam');
  });

  test('Handles very long parameter names', () => {
    const longParam = 'a'.repeat(1000);
    expect(typeof sanitizeURLParam(longParam)).toBe('string');
  });
});
