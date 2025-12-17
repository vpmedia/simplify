import { fixFloatPrecision } from './fixFloatPrecision.js';

describe('fixFloatPrecision', () => {
  test('Fixes float precision issues', () => {
    expect(fixFloatPrecision(0.20000000000000004)).toBe(0.2);
  });

  test('Handles zero', () => {
    expect(fixFloatPrecision(0)).toBe(0);
  });

  test('Handles negative numbers', () => {
    expect(fixFloatPrecision(-0.20000000000000004)).toBe(-0.2);
  });

  test('Handles very small numbers', () => {
    expect(fixFloatPrecision(0.0000000000001)).toBe(0);
  });

  test('Handles integer numbers', () => {
    expect(fixFloatPrecision(5)).toBe(5);
  });

  test('Handles string input', () => {
    expect(fixFloatPrecision('5.123456789')).toBe(5.123456789);
  });
});
