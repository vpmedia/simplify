import { deepMerge } from './deepMerge.js';

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
