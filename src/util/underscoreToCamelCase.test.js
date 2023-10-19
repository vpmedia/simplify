import { underscoreToCamelcase } from './underscoreToCamelCase.js';

test('TBD', () => {
  expect(underscoreToCamelcase('test')).toBe('test');
  expect(underscoreToCamelcase('test_variable')).toBe('testVariable');
  expect(underscoreToCamelcase('test_variable_name')).toBe('testVariableName');
});
