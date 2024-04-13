import { LEVEL_DEBUG, Logger } from './Logger.js';

test('Tests Logger', () => {
  const logger = new Logger('test');
  expect(Logger.exceptionHandler).toBe(null);
  expect(logger.level).toBe(LEVEL_DEBUG);
  let handledError = null;
  const exceptionHandler = (error) => {
    handledError = error;
  };
  Logger.exceptionHandler = exceptionHandler;
  logger.exception('test', 'error');
  expect(handledError).toBe('error');
});
