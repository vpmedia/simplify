import { deg2rad } from './deg2rad.js';

test('Converts degrees to radians', () => {
  expect(deg2rad(90)).toBe(1.5707963267948966);
});
