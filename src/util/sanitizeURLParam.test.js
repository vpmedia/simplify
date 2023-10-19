import { sanitizeURLParam } from './sanitizeURLParam.js';

test('Tests URL parameter sanitizer', () => {
  expect(sanitizeURLParam('abc<>-123[]{}-()A_BC')).toBe('abc-123-A_BC');
  expect(sanitizeURLParam(null)).toBe(null);
});
