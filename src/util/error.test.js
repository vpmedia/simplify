import { getErrorDetails } from './error.js';

test('Tests getErrorDetails', () => {
  const error = new Error('Test error', { cause: 'Test cause' });
  const errorDetails = getErrorDetails(error);
  expect(errorDetails.type).toBe('Error');
  expect(errorDetails.message).toBe('Test error');
  expect(errorDetails.cause).toBe('Test cause');
});

test('Tests getErrorDetails with Error cause', () => {
  const error = new SyntaxError('Test error', { cause: new TypeError('Cause error') });
  const errorDetails = getErrorDetails(error);
  expect(errorDetails.type).toBe('SyntaxError');
  expect(errorDetails.message).toBe('Test error');
  expect(errorDetails.cause instanceof Error).toBe(true);
  if (errorDetails.cause instanceof Error) {
    expect(errorDetails.cause.message).toBe('Cause error');
  }
});
