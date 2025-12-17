import { fixFloatPrecision } from './fixFloatPrecision.js';

test('Fixes float precision issues', () => {
  expect(fixFloatPrecision(0.20000000000000004)).toBe(0.2);
});
