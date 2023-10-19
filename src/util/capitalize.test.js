import { capitalizeFirstLetter } from './capitalize.js';

test('Tests capitalize first letter', () => {
  expect(capitalizeFirstLetter('test')).toBe('Test');
  expect(capitalizeFirstLetter(null)).toBe(null);
});
