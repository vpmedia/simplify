import { getErrorDetails } from './getErrorDetails.js';

test('Tests getErrorDetails', () => {
  const error = new Error('Test error', { cause: 'Test cause' });
  const errorDetails = getErrorDetails(error);
  expect(errorDetails.type).toBe('Error');
  expect(errorDetails.message).toBe('Test error');
  expect(errorDetails.cause).toBe('Test cause');
});
