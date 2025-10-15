import { AbstractLogHandler } from './AbstractLogHandler.js';
import { LOG_LEVEL_DEBUG, LOG_LEVEL_NAME_ERROR } from './const.js';
import { Logger } from './Logger.js';

class TestLogHandler extends AbstractLogHandler {
  /**
   * Test log handler.
   */
  constructor() {
    super(LOG_LEVEL_DEBUG);
    this.emitLogTarget = null;
    this.emitLogLevelName = null;
    this.emitLogMessage = null;
    this.emitLogExtraData = null;
    this.emitLogException = null;
  }

  /**
   * Emit log record.
   * @param {string} target - Log target.
   * @param {string} levelName - Log level name.
   * @param {string} message - Log message.
   * @param {object} extraData - Log extra data.
   * @param {Error} exception - Log extra data.
   */
  emit(target, levelName, message, extraData, exception) {
    this.emitLogTarget = target;
    this.emitLogLevelName = levelName;
    this.emitLogMessage = message;
    this.emitLogExtraData = extraData;
    this.emitLogException = exception;
  }
}

test('Tests Logger default level', () => {
  const logger = new Logger('test');
  expect(logger.level).toBe(LOG_LEVEL_DEBUG);
});

test('Tests Logger exception handler', () => {
  const logger = new Logger('test');
  expect(Logger.exceptionHandler).toBe(null);
  /** @type {Error} */
  let handledError = null;
  /**
   * Test exception handler.
   * @param {Error} error - Error instance.
   */
  const exceptionHandler = (error) => {
    handledError = error;
  };
  Logger.exceptionHandler = exceptionHandler;
  logger.exception('test', new Error('test_error'));
  expect(handledError.message).toBe('test_error');
});

test('Tests Logger custom handler', () => {
  const logger = new Logger('test');
  const testLogHandler = new TestLogHandler();
  Logger.addHandler(testLogHandler);
  logger.exception('test', new Error('test_error'));
  expect(testLogHandler.emitLogLevelName).toBe(LOG_LEVEL_NAME_ERROR);
  expect(testLogHandler.emitLogMessage).toBe('test');
  expect(testLogHandler.emitLogException.message).toBe('test_error');
});
