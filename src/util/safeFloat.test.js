import { addFloat, fixFloat, subFloat } from './safeFloat.js';

test('fixFloat()', () => {
  expect(fixFloat(0.20000000000000004)).toBe(0.2);
});

test('addFloat()', () => {
  expect(addFloat(0.20000000000000004, 0.1000001)).toBe(0.3);
});

test('subFloat()', () => {
  expect(subFloat(0.20000000000000004, 0.1000001)).toBe(0.1);
});
