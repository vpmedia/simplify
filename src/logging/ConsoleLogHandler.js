import { AbstractLogHandler } from './AbstractLogHandler.js';
import { LOG_LEVEL_DEBUG } from './const.js';
import { formatLogMessage } from './util.js';

const CONSOLE_FUNCTIONS = [
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
   * @param {number} level - Log handler level.
   */
  constructor(level = LOG_LEVEL_DEBUG) {
    super(level);
  }

  /**
   * Emit log record.
   * @param {import('./Logger.js').Logger} logger - Logger instance.
   * @param {number} timestamp - Log timestamp.
   * @param {number} level - Log level.
   * @param {string} message - Log message.
   * @param {object} extra - Log extra data.
   * @param {Error} error - Log error.
   * @throws {Error}
   */
  emit(logger, timestamp, level, message, extra, error) {
    const logMessage = formatLogMessage(logger, timestamp, level, message);
    const consoleFunction = CONSOLE_FUNCTIONS[level];
    if (consoleFunction === null) {
      return;
    }
    if (error) {
      extra === null ? consoleFunction(logMessage, error) : consoleFunction(logMessage, error, extra);
      return;
    }
    extra === null ? consoleFunction(logMessage) : consoleFunction(logMessage, extra);
  }
}
