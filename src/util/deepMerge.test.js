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
});
