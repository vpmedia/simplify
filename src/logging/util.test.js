import { formatLogMessage } from './util.js';

test('Test formatLogMessage()', () => {
  expect(formatLogMessage('loggerName', 'logMessage').endsWith('[loggerName] logMessage')).toBe(true);
});
