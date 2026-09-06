import { isNumber, isPositiveInteger } from '../util/validate.js';
import { TypeCheckError } from './TypeCheckError.js';
import { typeCheck, typeCheckArray, typeCheckEnum } from './util.js';

describe('typecheck', () => {
  test('typeCheck', () => {
    expect(() => typeCheck(0.1, isNumber)).not.toThrow(TypeCheckError);
    expect(() => typeCheck(-0.1, isPositiveInteger)).toThrow(TypeCheckError);
    expect(() => typeCheck('string', isNumber)).toThrow(TypeCheckError);
  });

  test('typeCheckArray', () => {
    expect(() => typeCheckArray([0.1], isNumber)).not.toThrow(TypeCheckError);
    expect(() => typeCheckArray(['string'], isNumber)).toThrow(TypeCheckError);
    // @ts-expect-error
    expect(() => typeCheckArray(-0.1, isPositiveInteger)).toThrow(TypeCheckError);
    // @ts-expect-error
    expect(() => typeCheckArray('string', isNumber)).toThrow(TypeCheckError);
  });

  test('typeCheckEnum', () => {
    expect(() => typeCheckEnum('AA', ['AA'])).not.toThrow(TypeCheckError);
    expect(() => typeCheckEnum('AA', ['BB'])).toThrow(TypeCheckError);
    // @ts-expect-error
    expect(() => typeCheckEnum(null, ['BB'])).toThrow(TypeCheckError);
    // @ts-expect-error
    expect(() => typeCheckEnum(['AA'], null)).toThrow(TypeCheckError);
    try {
      typeCheckEnum('AA', ['BB']);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Validation failed: isEnum - "AA" (string)');
      }
    }
  });
});
