import { getRandomInt } from './getRandomInt.js';

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
