import { getObjValueByPath } from './getObjValueByPath.js';
import { setObjValueByPath } from './setObjValueByPath.js';

test('Sets object value by path', () => {
  const source = { a: { b: { c: 'd' } } };
  expect(getObjValueByPath(source, 'a.b.c')).toBe('d');
  setObjValueByPath(source, 'a.b.c', 'newValue');
  expect(getObjValueByPath(source, 'a.b.c')).toBe('newValue');
});
