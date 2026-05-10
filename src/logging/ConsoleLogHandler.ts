import { AbstractLogHandler, type LogExtra } from './AbstractLogHandler.js';
import { LOG_LEVEL_DEBUG } from './const.js';
import type { Logger } from './Logger.js';
import { formatLogMessage } from './util.js';

type ConsoleFn = (...data: unknown[]) => void;

const CONSOLE_FUNCTIONS: ReadonlyArray<ConsoleFn | null> = [
  null, // silent
  console.error, // fatal
  console.error, // error
  console.warn, // warning
  console.info, // info
  console.debug, // debug
];

export class ConsoleLogHandler extends AbstractLogHandler {
  /**
   * Console log handler.
   */
  constructor(level: number = LOG_LEVEL_DEBUG) {
    super(level);
  }

  /**
   * Emit log record.
   */
  override emit(
    logger: Logger,
    timestamp: number,
    level: number,
    message: string,
    extra: LogExtra | null | undefined,
    error: Error | null | undefined
  ): void {
    if (logger.level < level) {
      return;
    }
    const logMessage = formatLogMessage(logger, timestamp, level, message);
    const consoleFunction = CONSOLE_FUNCTIONS[level];
    if (consoleFunction === null || consoleFunction === undefined) {
      return;
    }
    if (error) {
      extra === undefined ? consoleFunction(logMessage, error) : consoleFunction(logMessage, error, extra);
      if (error.cause) {
        consoleFunction('Error cause', error.cause);
      }
      return;
    }
    extra === undefined ? consoleFunction(logMessage) : consoleFunction(logMessage, extra);
  }
}
