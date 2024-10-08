import { purgeObject } from './purgeObject.js';

test('TBD', () => {
  const a = { k: 'v' };
  expect(a.k).toBe('v');
  purgeObject(a);
  expect(a.k).toBe(null);
});
