import { capitalize } from './capitalize.js';

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
