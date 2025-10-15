import { AbstractLogHandler } from './AbstractLogHandler.js';
import { LOG_LEVEL_DEBUG } from './const.js';
import { formatLogMessage } from './util.js';

const CONSOLE_FUNCTIONS = [
  null, // silent
  console.debug, // debug
  console.info, // info
  console.warn, // warning
  console.error, // error
  console.error, // fatal
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
   * @param {import('./Logger.js').Logger} logger - Log target.
   * @param {number} level - Log level.
   * @param {string} message - Log message.
   * @param {object} extra - Log extra data.
   * @param {Error} error - Log extra data.
   * @throws {Error}
   */
  emit(logger, level, message, extra, error) {
    const logMessage = formatLogMessage(logger.name, message);
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
