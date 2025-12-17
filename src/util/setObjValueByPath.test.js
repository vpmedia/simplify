import { getObjValueByPath } from './getObjValueByPath.js';
import { setObjValueByPath } from './setObjValueByPath.js';

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
