import { getObjValueByPath } from './getObjValueByPath.js';

describe('getObjValueByPath', () => {
  test('Gets object value by path', () => {
    const source = { a: { b: { c: 'd' } } };
    expect(getObjValueByPath(source, 'a.b.c')).toBe('d');
  });

  test('Returns null when object is null or undefined', () => {
    expect(getObjValueByPath(null, 'a.b.c')).toBeNull();
    expect(getObjValueByPath(undefined, 'a.b.c')).toBeNull();
  });

  test('Returns null when path is empty or null', () => {
    expect(getObjValueByPath({ a: 'b' }, '')).toBeNull();
    expect(getObjValueByPath({ a: 'b' }, null)).toBeNull();
  });

  test('Returns null when property does not exist', () => {
    const source = { a: { b: 'c' } };
    expect(getObjValueByPath(source, 'a.b.c')).toBeNull();
  });

  test('Returns null when property is undefined', () => {
    const source = { a: { b: undefined } };
    expect(getObjValueByPath(source, 'a.b')).toBeNull();
  });

  test('Handles single-level paths correctly', () => {
    const source = { a: 'value' };
    expect(getObjValueByPath(source, 'a')).toBe('value');
  });

  test('Handles nested paths correctly', () => {
    const source = {
      level1: {
        level2: {
          level3: 'deepValue',
        },
      },
    };
    expect(getObjValueByPath(source, 'level1.level2.level3')).toBe('deepValue');
  });

  test('Handles arrays in paths', () => {
    const source = {
      items: [{ name: 'item1' }, { name: 'item2' }],
    };
    expect(getObjValueByPath(source, 'items.0.name')).toBe('item1');
  });
});
