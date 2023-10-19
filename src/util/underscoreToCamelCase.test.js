import { underscoreToCamelCase } from './underscoreToCamelCase.js';

test('TBD', () => {
  expect(underscoreToCamelCase('test')).toBe('test');
  expect(underscoreToCamelCase('test_variable')).toBe('testVariable');
  expect(underscoreToCamelCase('test_variable_name')).toBe('testVariableName');
});
