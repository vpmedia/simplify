import { purgeObject } from './purgeObject.js';

test('Purges object of null and undefined values', () => {
  const a = { k: 'v' };
  expect(a.k).toBe('v');
  purgeObject(a);
  expect(a.k).toBe(null);
});
