/**
 * Fixes floating point number (0.20000000000000004 -> 0.2).
 * @param {number | string} value - Number to fix.
 * @returns {number} The fixed number.
 */
export function fixFloatPrecision(value: number | string): number;
/**
 * Convenience method for floating point precision handling.
 * @param {number} value - The number to process.
 * @param {number} p - The precision. Defaults to 2.
 * @returns {number} The processed value.
 */
export function fixFloat(value: number, p?: number): number;
/**
 * Adds two value with floating point precision.
 * @param {number} a - The number a.
 * @param {number} b - The number b.
 * @returns {number} The processed value.
 */
export function addFloat(a: number, b: number): number;
/**
 * Substracts two value with floating point precision.
 * @param {number} a - The number a.
 * @param {number} b - The number b.
 * @returns {number} The processed value.
 */
export function subFloat(a: number, b: number): number;
export function deg2rad(deg: number): number;
export function getRandomInt(min: number, max: number): number;
export function isGt(value: number, min: number): boolean;
export function isGtOrEq(value: number, min: number): boolean;
export function isLe(value: number, min: number): boolean;
export function isLeOrEq(value: number, min: number): boolean;
export function isInRange(value: number, min: number, max: number): boolean;
export function isEq(value: number, expected: number): boolean;
//# sourceMappingURL=number.d.ts.map