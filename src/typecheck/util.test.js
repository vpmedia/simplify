import { isNumber, isPositiveInteger } from '../util/validate.js';
import { TypeCheckError } from './TypeCheckError.js';
import { typeCheck, typeCheckArray, typeCheckEnum } from './util.js';

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

  test('typeCheckEnum', () => {
    expect(() => typeCheckEnum('AA', ['AA'])).not.toThrowError(TypeCheckError);
    expect(() => typeCheckEnum('AA', ['BB'])).toThrowError(TypeCheckError);
    expect(() => typeCheckEnum(null, ['BB'])).toThrowError(TypeCheckError);
    // @ts-expect-error
    expect(() => typeCheckEnum(['AA'], null)).toThrowError(TypeCheckError);
    try {
      typeCheckEnum('AA', ['BB']);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Validation failed: isEnum - "AA" (string)');
      }
    }
  });
});
