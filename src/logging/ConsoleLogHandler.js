import { AbstractLogHandler } from './AbstractLogHandler.js';
import {
  LOG_LEVEL_NAME_DEBUG,
  LOG_LEVEL_NAME_ERROR,
  LOG_LEVEL_NAME_INFO,
  LOG_LEVEL_NAME_SILENT,
  LOG_LEVEL_NAME_WARNING,
} from './const.js';
import { formatLogMessage } from './util.js';

const CONSOLE_CALLER_MAP = {
  [LOG_LEVEL_NAME_SILENT]: () => null,
  [LOG_LEVEL_NAME_DEBUG]: console.debug,
  [LOG_LEVEL_NAME_INFO]: console.info,
  [LOG_LEVEL_NAME_WARNING]: console.warn,
  [LOG_LEVEL_NAME_ERROR]: console.error,
};

export class ConsoleLogHandler extends AbstractLogHandler {
  /**
   * Abstract log handler.
   * @param {number} level - Log level.
   */
  constructor(level) {
    super(level);
  }

  /**
   * Emit log record.
   * @param {string} target - Log target.
   * @param {string} levelName - Log level.
   * @param {string} message - Log message.
   * @param {object} extraData - Log extra data.
   * @param {Error} exception - Log extra data.
   * @throws {Error}
   */
  emit(target, levelName, message, extraData, exception) {
    const logMessage = formatLogMessage(target, message);
    const consoleCaller = CONSOLE_CALLER_MAP[levelName];
    extraData === null ? consoleCaller(logMessage) : consoleCaller(logMessage, extraData);
  }
}
