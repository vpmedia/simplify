import { describe, it, expect } from 'vitest';
import { typeChecker } from './TypeChecker.js';
import { TypeCheckError } from './TypeCheckError.js';

const stringValidator = (value) => typeof value === 'string';

describe('TypeChecker', () => {
  it('should check value type correctly', () => {
    const result = typeChecker.check('test', stringValidator);
    expect(result).toBe('test');
  });

  it('should throw TypeCheckError for invalid type', () => {
    expect(() => typeChecker.check(123, stringValidator)).toThrow(TypeCheckError);
  });

  it('should swallow errors when enabled', () => {
    typeChecker.setSwallowErrors(true);
    const result = typeChecker.check(123, stringValidator);
    expect(result).toBe(123);
    typeChecker.setSwallowErrors(false);
  });

  it('should check array type correctly', () => {
    const result = typeChecker.checkArray(['a', 'b', 'c'], stringValidator);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should throw TypeCheckError for invalid array type', () => {
    expect(() => typeChecker.checkArray([1, 2, 3], stringValidator)).toThrow(TypeCheckError);
  });

  it('should swallow array errors when enabled', () => {
    typeChecker.setSwallowErrors(true);
    const result = typeChecker.checkArray([1, 2, 3], stringValidator);
    expect(result).toEqual([1, 2, 3]);
    typeChecker.setSwallowErrors(false);
  });

  it('should check enum value correctly', () => {
    const choices = ['option1', 'option2', 'option3'];
    const result = typeChecker.checkEnum('option2', choices);
    expect(result).toBe('option2');
  });

  it('should throw TypeCheckError for invalid enum value', () => {
    const choices = ['option1', 'option2', 'option3'];
    expect(() => typeChecker.checkEnum('invalid', choices)).toThrow(TypeCheckError);
  });

  it('should swallow enum errors when enabled', () => {
    typeChecker.setSwallowErrors(true);
    const choices = ['option1', 'option2', 'option3'];
    const result = typeChecker.checkEnum('invalid', choices);
    expect(result).toBe('invalid');
    typeChecker.setSwallowErrors(false);
  });

  it('should handle number enum values', () => {
    const choices = [1, 2, 3];
    const result = typeChecker.checkEnum(2, choices);
    expect(result).toBe(2);
  });

  it('should handle mixed string and number enum values', () => {
    const choices = ['option1', 2, 'option3'];
    const result = typeChecker.checkEnum(2, choices);
    expect(result).toBe(2);
  });
});
