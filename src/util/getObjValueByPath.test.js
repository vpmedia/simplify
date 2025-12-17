import { getObjValueByPath } from './getObjValueByPath.js';

test('Gets object value by path', () => {
  const source = { a: { b: { c: 'd' } } };
  expect(getObjValueByPath(source, 'a.b.c')).toBe('d');
});
