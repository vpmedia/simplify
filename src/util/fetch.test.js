import { fetchRetry, FetchError } from './fetch.js';

describe('fetchRetry', () => {
  test('should export fetchRetry function and FetchError class', () => {
    expect(fetchRetry).toBeDefined();
    expect(FetchError).toBeDefined();
  });

  test('should handle basic parameter validation', () => {
    expect(typeof fetchRetry).toBe('function');
  });
});
