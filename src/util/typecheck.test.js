import { typeCheck, typeCheckArray, TypeCheckError } from './typecheck.js';
import { isNumber, isPositiveInteger } from './validate.js';

describe('typecheck', () => {
  test('typeCheck', () => {
    expect(() => typeCheck(0.1, isNumber)).not.toThrowError(TypeCheckError);
    expect(() => typeCheck(-0.1, isPositiveInteger)).toThrowError(TypeCheckError);
    expect(() => typeCheck('string', isNumber)).toThrowError(TypeCheckError);
  });

  test('typeCheckArray', () => {
    expect(() => typeCheckArray([0.1], isNumber)).not.toThrowError(TypeCheckError);
    expect(() => typeCheckArray(['string'], isNumber)).toThrowError(TypeCheckError);
    // @ts-expect-error
    expect(() => typeCheckArray(-0.1, isPositiveInteger)).toThrowError(TypeCheckError);
    // @ts-expect-error
    expect(() => typeCheckArray('string', isNumber)).toThrowError(TypeCheckError);
  });
});
