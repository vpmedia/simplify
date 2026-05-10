import { AbstractLogHandler, type LogExtra } from './AbstractLogHandler.js';
import { LOG_LEVEL_DEBUG, LOG_LEVEL_ERROR, LOG_LEVEL_FATAL, LOG_LEVEL_INFO, LOG_LEVEL_WARNING } from './const.js';
import { Logger } from './Logger.js';

class TestLogHandler extends AbstractLogHandler {
  emitLogLogger: Logger | null = null;
  emitLogTimestamp: number | null = null;
  emitLogLevel: number | null = null;
  emitLogMessage: string | null = null;
  emitLogExtra: LogExtra | null | undefined = null;
  emitLogError: Error | null | undefined = null;

  constructor() {
    super(LOG_LEVEL_DEBUG);
  }

  override emit(
    logger: Logger,
    timestamp: number,
    level: number,
    message: string,
    extra: LogExtra | null | undefined,
    error: Error | null | undefined
  ): void {
    this.emitLogLogger = logger;
    this.emitLogTimestamp = timestamp;
    this.emitLogLevel = level;
    this.emitLogMessage = message;
    this.emitLogExtra = extra;
    this.emitLogError = error;
  }
}

test('Tests Logger default level', () => {
  const logger = new Logger('test');
  expect(logger.level).toBe(LOG_LEVEL_DEBUG);
});

test('Tests Logger custom handler', () => {
  const logger = new Logger('test');
  const testLogHandler = new TestLogHandler();
  Logger.addHandler(testLogHandler);
  // debug
  logger.debug('debug');
  expect(testLogHandler.emitLogLevel).toBe(LOG_LEVEL_DEBUG);
  expect(testLogHandler.emitLogMessage).toBe('debug');
  // info
  logger.info('info');
  expect(testLogHandler.emitLogLevel).toBe(LOG_LEVEL_INFO);
  expect(testLogHandler.emitLogMessage).toBe('info');
  // warning
  logger.warn('warning');
  expect(testLogHandler.emitLogLevel).toBe(LOG_LEVEL_WARNING);
  expect(testLogHandler.emitLogMessage).toBe('warning');
  logger.warning('warning');
  expect(testLogHandler.emitLogLevel).toBe(LOG_LEVEL_WARNING);
  expect(testLogHandler.emitLogMessage).toBe('warning');
  // error
  logger.error('error');
  expect(testLogHandler.emitLogLevel).toBe(LOG_LEVEL_ERROR);
  expect(testLogHandler.emitLogMessage).toBe('error');
  // exception
  logger.exception('test', new Error('test_error'), { context: 'ctx' });
  expect(testLogHandler.emitLogLevel).toBe(LOG_LEVEL_FATAL);
  expect(testLogHandler.emitLogMessage).toBe('test');
  expect(testLogHandler.emitLogError?.message).toBe('test_error');
  expect(testLogHandler.emitLogLogger).toBe(logger);
  expect(testLogHandler.emitLogExtra?.['context']).toBe('ctx');
});
