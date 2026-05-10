import { TypeCheckError } from '../typecheck/TypeCheckError.js';

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

const PRECISION = 12;
const EPSILON = 1e-11;

/**
 * Converts degrees to radians.
 */
export const deg2rad = (degrees: number): number => {
  if (!Number.isFinite(degrees)) {
    throw new TypeCheckError('Argument degrees must be a finite number', { value: degrees });
  }
  return degrees * DEG_TO_RAD;
};

/**
 * Converts radians to degrees.
 */
export const rad2deg = (radians: number): number => {
  if (!Number.isFinite(radians)) {
    throw new TypeCheckError('Argument radians must be a finite number', { value: radians });
  }
  return radians * RAD_TO_DEG;
};

/**
 * Returns random integer in range.
 */
export const getRandomInt = (min: number, max: number): number => {
  if (!Number.isFinite(min)) {
    throw new TypeCheckError('Argument min must be finite number', { value: min });
  }
  if (!Number.isFinite(max)) {
    throw new TypeCheckError('Argument max must be finite number', { value: max });
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Normalizes floating point precision (e.g. 0.20000000000000004 → 0.2).
 */
export const fixFloatPrecision = (value: number | string | null | undefined): number => {
  const parsedValue = typeof value === 'string' ? Number(value) : value;
  if (parsedValue === null || parsedValue === undefined || !Number.isFinite(parsedValue)) {
    return Number.NaN;
  }
  return Math.abs(parsedValue) < EPSILON ? 0 : Number(parsedValue.toPrecision(PRECISION));
};

export const isGreater = (value: number, min: number): boolean => value > min;
export const isGreaterOrEqual = (value: number, min: number): boolean => value >= min;
export const isLess = (value: number, min: number): boolean => value < min;
export const isLessOrEqual = (value: number, min: number): boolean => value <= min;
export const isInRange = (value: number, min: number, max: number): boolean => value >= min && value <= max;
export const isEqual = (value: number, expected: number): boolean => value === expected;
