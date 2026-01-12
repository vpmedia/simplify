/* eslint-disable unicorn/no-useless-undefined */

import {
  isArray,
  isArrayOf,
  isBoolean,
  isEnum,
  isFunction,
  isInstance,
  isInteger,
  isNonNegativeInteger,
  isNonNegativeNumber,
  isNull,
  isNumber,
  isObject,
  isObjectOf,
  isPositiveInteger,
  isPositiveNumber,
  isString,
  isUndefined,
  typeCheck,
  typeCheckArray,
  TypeCheckError,
} from './typeCheck.js';

describe('validate', () => {
  test('isArray', () => {
    expect(isArray('string')).toBe(false);
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray({ string: '1' })).toBe(false);
    expect(isArray(0.1)).toBe(false);
    expect(isArray(1)).toBe(false);
    expect(isArray(false)).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray(() => true)).toBe(false);
  });

  test('isBoolean', () => {
    expect(isBoolean('string')).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean([1, 2, 3])).toBe(false);
    expect(isBoolean({ string: '1' })).toBe(false);
    expect(isBoolean(0.1)).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(() => true)).toBe(false);
  });

  test('isNumber', () => {
    expect(isNumber('string')).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber([1, 2, 3])).toBe(false);
    expect(isNumber({ string: '1' })).toBe(false);
    expect(isNumber(0.1)).toBe(true);
    expect(isNumber(1)).toBe(true);
    expect(isNumber(false)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(Number.NaN)).toBe(false);
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(() => true)).toBe(false);
  });

  test('isPositiveNumber', () => {
    expect(isPositiveNumber(0)).toBe(false);
    expect(isPositiveNumber(1)).toBe(true);
    expect(isPositiveNumber(1.1)).toBe(true);
    expect(isPositiveNumber(-1)).toBe(false);
    expect(isPositiveNumber(-1.1)).toBe(false);
  });

  test('isNonNegativeNumber', () => {
    expect(isNonNegativeNumber(0)).toBe(true);
    expect(isNonNegativeNumber(1)).toBe(true);
    expect(isNonNegativeNumber(1.1)).toBe(true);
    expect(isNonNegativeNumber(-1)).toBe(false);
    expect(isNonNegativeNumber(-1.1)).toBe(false);
  });

  test('isInteger', () => {
    expect(isInteger('string')).toBe(false);
    expect(isInteger(() => true)).toBe(false);
    expect(isInteger([])).toBe(false);
    expect(isInteger([1, 2, 3])).toBe(false);
    expect(isInteger({ string: '1' })).toBe(false);
    expect(isInteger(0.1)).toBe(false);
    expect(isInteger(1)).toBe(true);
    expect(isInteger(false)).toBe(false);
    expect(isInteger(null)).toBe(false);
    expect(isInteger(Number.NaN)).toBe(false);
    expect(isInteger(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isInteger(true)).toBe(false);
    expect(isInteger(undefined)).toBe(false);
  });

  test('isPositiveInteger', () => {
    expect(isPositiveInteger(0)).toBe(false);
    expect(isPositiveInteger(1)).toBe(true);
    expect(isPositiveInteger(1.1)).toBe(false);
    expect(isPositiveInteger(-1)).toBe(false);
    expect(isPositiveInteger(-1.1)).toBe(false);
  });

  test('isNonNegativeInteger', () => {
    expect(isNonNegativeInteger(0)).toBe(true);
    expect(isNonNegativeInteger(1)).toBe(true);
    expect(isNonNegativeInteger(1.1)).toBe(false);
    expect(isNonNegativeInteger(-1)).toBe(false);
    expect(isNonNegativeInteger(-1.1)).toBe(false);
  });

  test('isString', () => {
    expect(isString('string')).toBe(true);
    expect(isString([])).toBe(false);
    expect(isString([1, 2, 3])).toBe(false);
    expect(isString({ string: '1' })).toBe(false);
    expect(isString(0.1)).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(() => true)).toBe(false);
  });

  test('isFunction', () => {
    expect(isFunction('string')).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction([1, 2, 3])).toBe(false);
    expect(isFunction({ string: '1' })).toBe(false);
    expect(isFunction(0.1)).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction(false)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(() => true)).toBe(true);
  });

  test('isNull', () => {
    expect(isNull('string')).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull([1, 2, 3])).toBe(false);
    expect(isNull({ string: '1' })).toBe(false);
    expect(isNull(0.1)).toBe(false);
    expect(isNull(1)).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull(null)).toBe(true);
    expect(isNull(true)).toBe(false);
    expect(isNull(undefined)).toBe(false);
    expect(isNull(() => true)).toBe(false);
  });

  test('isUndefined', () => {
    expect(isUndefined('string')).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined([1, 2, 3])).toBe(false);
    expect(isUndefined({ string: '1' })).toBe(false);
    expect(isUndefined(0.1)).toBe(false);
    expect(isUndefined(1)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(() => true)).toBe(false);
  });

  test('isObject', () => {
    expect(isObject('string')).toBe(false);
    expect(isObject(() => true)).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject([1, 2, 3])).toBe(false);
    expect(isObject({ string: '1' })).toBe(true);
    expect(isObject(0.1)).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject(false)).toBe(false);
    expect(isObject(new Date())).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });

  test('isInstance', () => {
    class CustomError extends Error {}
    expect(isInstance({}, {})).toBe(false);
    expect(isInstance({}, Number)).toBe(false);
    expect(isInstance(new CustomError(), {})).toBe(false);
    expect(isInstance(new CustomError(), Error)).toBe(true);
    expect(isInstance(new CustomError(), Number)).toBe(false);
  });

  test('isEnum', () => {
    expect(isEnum(0, [1, 2])).toBe(false);
    expect(isEnum(1, [1, 2])).toBe(true);
    expect(isEnum('AB', ['AB', 'CD'])).toBe(true);
    expect(isEnum('EF', ['AB', 'CD'])).toBe(false);
    expect(isEnum('AB', { AB: 'AB', CD: 'CD' })).toBe(true);
    expect(isEnum('EF', { AB: 'AB', CD: 'CD' })).toBe(false);
    expect(isEnum('AB', new Set(['AB', 'CD']))).toBe(true);
    expect(isEnum('EF', new Set(['AB', 'CD']))).toBe(false);
    expect(isEnum('EF', null)).toBe(false);
    expect(isEnum('EF', undefined)).toBe(false);
    expect(isEnum('EF', 1)).toBe(false);
    expect(isEnum('EF', 'string')).toBe(false);
    expect(isEnum(false, 'string')).toBe(false);
  });

  test('isArrayOf', () => {
    expect(isArrayOf(0.1, isNumber)).toBe(false);
    expect(isArrayOf([0.1, 'string'], isNumber)).toBe(false);
    expect(isArrayOf([0.1, 0.2], isNumber)).toBe(true);
    expect(isArrayOf([0.1, 1, 2], isInteger)).toBe(false);
    expect(isArrayOf([1, 2], isInteger)).toBe(true);
  });

  test('isObjectOf', () => {
    expect(isObjectOf(0.1, isNumber)).toBe(false);
    expect(isObjectOf({ a: 0.1, b: 'string' }, isNumber)).toBe(false);
    expect(isObjectOf({ a: 0.1, b: 0.2 }, isNumber)).toBe(true);
    expect(isObjectOf({ a: 0.1, b: 1, c: 2 }, isInteger)).toBe(false);
    expect(isObjectOf({ a: 1, b: 2 }, isInteger)).toBe(true);
  });

  test('typeCheck', () => {
    expect(() => typeCheck(0.1, isNumber)).not.toThrowError(TypeCheckError);
    expect(() => typeCheck(-0.1, isPositiveInteger)).toThrowError(TypeCheckError);
    expect(() => typeCheck('string', isNumber)).toThrowError(TypeCheckError);
  });

  test('typeCheckArray', () => {
    expect(() => typeCheckArray([0.1], isNumber)).not.toThrowError(TypeCheckError);
    expect(() => typeCheckArray(['string'], isNumber)).toThrowError(TypeCheckError);
    expect(() => typeCheckArray(-0.1, isPositiveInteger)).toThrowError(TypeCheckError);
    expect(() => typeCheckArray('string', isNumber)).toThrowError(TypeCheckError);
  });
});
