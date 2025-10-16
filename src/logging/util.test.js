import {
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_ERROR,
  LOG_LEVEL_FATAL,
  LOG_LEVEL_INFO,
  LOG_LEVEL_NAME_DEBUG,
  LOG_LEVEL_NAME_ERROR,
  LOG_LEVEL_NAME_FATAL,
  LOG_LEVEL_NAME_INFO,
  LOG_LEVEL_NAME_SILENT,
  LOG_LEVEL_NAME_WARNING,
  LOG_LEVEL_SILENT,
  LOG_LEVEL_WARNING,
} from './const.js';
import { formatLogMessage, getLogLevelName } from './util.js';

test('formatLogMessage()', () => {
  expect(
    formatLogMessage({ name: 'loggerName' }, Date.now, LOG_LEVEL_INFO, 'logMessage').endsWith('[loggerName] logMessage')
  ).toBe(true);
});

test('getLogLevelName()', () => {
  expect(getLogLevelName(LOG_LEVEL_DEBUG)).toBe(LOG_LEVEL_NAME_DEBUG);
  expect(getLogLevelName(LOG_LEVEL_INFO)).toBe(LOG_LEVEL_NAME_INFO);
  expect(getLogLevelName(LOG_LEVEL_WARNING)).toBe(LOG_LEVEL_NAME_WARNING);
  expect(getLogLevelName(LOG_LEVEL_ERROR)).toBe(LOG_LEVEL_NAME_ERROR);
  expect(getLogLevelName(LOG_LEVEL_FATAL)).toBe(LOG_LEVEL_NAME_FATAL);
  expect(getLogLevelName(LOG_LEVEL_SILENT)).toBe(LOG_LEVEL_NAME_SILENT);
});
