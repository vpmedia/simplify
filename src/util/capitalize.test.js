import { capitalize } from './capitalize.js';

test('Tests capitalize first letter', () => {
  expect(capitalize('test')).toBe('Test');
  expect(capitalize(null)).toBe(null);
});
