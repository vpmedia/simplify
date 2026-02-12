import { getErrorDetails, getTypedError } from './error.js';

describe('error', () => {
  test('getErrorDetails', () => {
    const error = new Error('Test error', { cause: 'Test cause' });
    const errorDetails = getErrorDetails(error);
    expect(errorDetails.type).toBe('Error');
    expect(errorDetails.message).toBe('Test error');
    expect(errorDetails.cause).toBe('Test cause');
    expect(errorDetails.stack).toBe(undefined);
  });

  test('getErrorDetails with Error cause', () => {
    const error = new SyntaxError('Test error', { cause: new TypeError('Cause error') });
    const errorDetails = getErrorDetails(error);
    expect(errorDetails.type).toBe('SyntaxError');
    expect(errorDetails.message).toBe('Test error');
    expect(errorDetails.cause instanceof Error).toBe(true);
    if (errorDetails.cause instanceof Error) {
      expect(errorDetails.cause.message).toBe('Cause error');
    }
  });

  test('getTypedError', () => {
    expect(getTypedError(new Error('Error message')).message).toBe('Error message');
    expect(getTypedError('Error message').message).toBe('Error message');
    expect(getTypedError(1).message).toBe('1');
    expect(getTypedError(true).message).toBe('true');
    expect(getTypedError(null).message).toBe('null');
    expect(getTypedError(undefined).message).toBe('undefined');
  });
});
