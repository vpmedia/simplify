import { getURLParam } from './getURLParam.js';

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
});
