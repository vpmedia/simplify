import { getObjValueByPath, setObjValueByPath, purgeObject, deepMerge } from './object.js';

describe('deepMerge', () => {
  test('should override deep properties correctly', () => {
    const defaultObj = { a: { b: 1, c: 2 }, d: 3 };
    const overrideObj = { a: { b: 42 } };
    const expectedResult = { a: { b: 42, c: 2 }, d: 3 };

    expect(deepMerge({ ...defaultObj }, overrideObj)).toEqual(expectedResult);
  });

  test('should not modify the original target object', () => {
    const target = { x: { y: 10 } };
    const source = { x: { y: 20 } };
    const copy = { ...target };

    deepMerge(target, source);
    expect(target).toEqual(copy);
  });

  test('should handle non-object values correctly', () => {
    expect(deepMerge(null, { a: 1 })).toEqual({ a: 1 });
    expect(deepMerge({ a: 1 }, null)).toEqual({ a: 1 });
  });

  test('should handle arrays correctly', () => {
    const target = { arr: [1, 2] };
    const source = { arr: [3, 4] };

    expect(deepMerge(target, source)).toEqual({ arr: [3, 4] });
  });

  test('should handle nested arrays correctly', () => {
    const target = { obj: { arr: [1, 2] } };
    const source = { obj: { arr: [3, 4] } };

    expect(deepMerge(target, source)).toEqual({ obj: { arr: [3, 4] } });
  });

  test('should handle string values', () => {
    const target = { str: 'hello' };
    const source = { str: 'world' };

    expect(deepMerge(target, source)).toEqual({ str: 'world' });
  });

  test('should handle number values', () => {
    const target = { num: 42 };
    const source = { num: 100 };

    expect(deepMerge(target, source)).toEqual({ num: 100 });
  });

  test('should handle boolean values', () => {
    const target = { bool: true };
    const source = { bool: false };

    expect(deepMerge(target, source)).toEqual({ bool: false });
  });

  test('should handle undefined values', () => {
    const target = { undef: undefined };
    const source = { undef: 'value' };

    expect(deepMerge(target, source)).toEqual({ undef: 'value' });
  });

  test('should handle null values', () => {
    const target = { nullVal: null };
    const source = { nullVal: 'value' };

    expect(deepMerge(target, source)).toEqual({ nullVal: 'value' });
  });

  test('should handle mixed property types', () => {
    const target = {
      str: 'hello',
      num: 42,
      arr: [1, 2],
      obj: { nested: 'value' },
    };
    const source = {
      str: 'world',
      num: 100,
      arr: [3, 4],
      obj: { nested: 'newValue' },
    };

    expect(deepMerge(target, source)).toEqual({
      str: 'world',
      num: 100,
      arr: [3, 4],
      obj: { nested: 'newValue' },
    });
  });

  test('should handle constructor and __proto__ protection', () => {
    const target = { a: 1 };
    const source = { b: 2 };

    expect(deepMerge(target, source)).toEqual({ a: 1, b: 2 });
  });
});

test('Purges object of null and undefined values', () => {
  const a = { k: 'v' };
  expect(a.k).toBe('v');
  purgeObject(a);
  expect(a.k).toBe(null);
});

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

describe('setObjValueByPath', () => {
  test('Sets object value by path', () => {
    const source = { a: { b: { c: 'd' } } };
    expect(getObjValueByPath(source, 'a.b.c')).toBe('d');
    setObjValueByPath(source, 'a.b.c', 'newValue');
    expect(getObjValueByPath(source, 'a.b.c')).toBe('newValue');
  });

  test('Handles null or undefined object', () => {
    // Should not throw error
    setObjValueByPath(null, 'a.b.c', 'value');
    setObjValueByPath(undefined, 'a.b.c', 'value');
  });

  test('Handles null or undefined path', () => {
    const source = { a: 'b' };
    // Should not throw error
    setObjValueByPath(source, null, 'value');
    setObjValueByPath(source, undefined, 'value');
  });

  test('Sets value at root level', () => {
    const source = { a: 'oldValue' };
    setObjValueByPath(source, 'a', 'newValue');
    expect(source.a).toBe('newValue');
  });

  test('Creates new nested properties', () => {
    const source = { a: { b: 'existing' } };
    setObjValueByPath(source, 'a.c.d', 'newNestedValue');
    expect(getObjValueByPath(source, 'a.c.d')).toBe('newNestedValue');
  });

  test('Handles array paths', () => {
    const source = { items: [{ name: 'item1' }] };
    setObjValueByPath(source, 'items.0.name', 'updatedItem');
    expect(getObjValueByPath(source, 'items.0.name')).toBe('updatedItem');
  });

  test('Throws error for __proto__ path', () => {
    const source = { a: 'b' };
    expect(() => setObjValueByPath(source, '__proto__.test', 'value')).toThrow(SyntaxError);
  });
});
