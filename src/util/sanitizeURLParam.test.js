import { sanitizeURLParam } from './sanitizeURLParam.js';

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
});
