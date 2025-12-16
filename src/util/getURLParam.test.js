import { getURLParam } from './getURLParam.js';

test('Tests getURLParam()', () => {
  expect(getURLParam('key', 'fallback')).toBe('fallback');
});
