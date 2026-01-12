import {
  addFloat,
  fixFloat,
  fixFloatPrecision,
  getRandomInt,
  isEqual,
  isGreater,
  isGreaterOrEqual,
  isInRange,
  isLess,
  isLessOrEqual,
  subFloat,
  deg2rad,
} from './number.js';

test('Converts degrees to radians', () => {
  expect(deg2rad(90)).toBe(1.5707963267948966);
});

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

describe('getRandomInt', () => {
  test('Returns random integer within range when min equals max', () => {
    expect(getRandomInt(1, 1)).toBe(1);
  });

  test('Returns random integer within range when min is less than max', () => {
    const result = getRandomInt(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  test('Works with negative numbers', () => {
    const result = getRandomInt(-5, -1);
    expect(result).toBeGreaterThanOrEqual(-5);
    expect(result).toBeLessThanOrEqual(-1);
  });

  test('Works with zero range', () => {
    const result = getRandomInt(0, 0);
    expect(result).toBe(0);
  });
});

test('fixFloat()', () => {
  expect(fixFloat(0.20000000000000004)).toBe(0.2);
});

test('addFloat()', () => {
  expect(addFloat(0.20000000000000004, 0.1000001)).toBe(0.3);
});

test('subFloat()', () => {
  expect(subFloat(0.20000000000000004, 0.1000001)).toBe(0.1);
});

describe('number', () => {
  test('isEq', () => {
    expect(isEqual(1, 0)).toBe(false);
    expect(isEqual(1, 1)).toBe(true);
  });

  test('isGt', () => {
    expect(isGreater(1, 0)).toBe(true);
    expect(isGreater(1, 1)).toBe(false);
  });

  test('isGtOrEq', () => {
    expect(isGreaterOrEqual(1, 0)).toBe(true);
    expect(isGreaterOrEqual(1, 1)).toBe(true);
    expect(isGreaterOrEqual(1, 2)).toBe(false);
  });

  test('isGtOrEq', () => {
    expect(isInRange(1, 0, 2)).toBe(true);
    expect(isInRange(1, 0, 1)).toBe(true);
    expect(isInRange(2, 0, 1)).toBe(false);
  });

  test('isLe', () => {
    expect(isLess(1, 0)).toBe(false);
    expect(isLess(0, 0)).toBe(false);
    expect(isLess(0, 1)).toBe(true);
  });

  test('isLeOrEq', () => {
    expect(isLessOrEqual(1, 0)).toBe(false);
    expect(isLessOrEqual(0, 0)).toBe(true);
    expect(isLessOrEqual(0, 1)).toBe(true);
  });
});
