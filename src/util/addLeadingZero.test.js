import { addLeadingZero } from './addLeadingZero.js';

test('Tests add leading zero', () => {
  expect(addLeadingZero(1)).toBe('01');
  expect(addLeadingZero('1')).toBe('01');
  expect(addLeadingZero(1, 3)).toBe('001');
  expect(addLeadingZero('21')).toBe('21');
  expect(addLeadingZero(21)).toBe('21');
  expect(addLeadingZero(null)).toBe(null);
  expect(addLeadingZero()).toBe(undefined);
});
