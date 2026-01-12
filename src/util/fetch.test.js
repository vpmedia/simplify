import { fetchRetry, FetchError } from './fetch.js';

describe('fetchRetry', () => {
  test('core', () => {
    expect(fetchRetry).toBeDefined();
    expect(typeof fetchRetry).toBe('function');
    expect(FetchError).toBeDefined();
  });
});
