import { getObjValueByPath } from './getObjValueByPath.js';

test('Tests getObjValueByPath', () => {
  const source = { a: { b: { c: 'd' } } };
  expect(getObjValueByPath(source, 'a.b.c')).toBe('d');
});
