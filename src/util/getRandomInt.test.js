import { getRandomInt } from './getRandomInt.js';

test('Gets random integer within range', () => {
  expect(getRandomInt(1, 1)).toBe(1);
});
