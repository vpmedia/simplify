import { getURLParam } from '../util/getURLParam.js';
import {
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_ERROR,
  LOG_LEVEL_FATAL,
  LOG_LEVEL_INFO,
  LOG_LEVEL_SILENT,
  LOG_LEVEL_WARNING,
} from './const.js';
import { getAppEnvironment } from './util.js';

const ROOT_LOGGER_NAME = 'root';

export class Logger {
  /**
   * @type {import('./AbstractLogHandler.js').AbstractLogHandler[]}
   */
  static handlers = [];

  /**
   * Creates a new Logger instance.
   * @param {string} [name] - The logger name.
   */
  constructor(name = ROOT_LOGGER_NAME) {
    this.name = name ?? ROOT_LOGGER_NAME;
    const appEnvironment = getAppEnvironment();
    const isProduction = appEnvironment === 'production' || appEnvironment === 'release';
    const defaultLevel = isProduction ? LOG_LEVEL_SILENT : LOG_LEVEL_DEBUG;
    const parameterName = `log_${this.name.toLowerCase()}`;
    const paramLevel =
      getURLParam(parameterName, getURLParam('log_all', defaultLevel.toString())) ?? defaultLevel.toString();
    /** @type {number} */
    this.level = Number.parseInt(paramLevel, 10);
  }

  /**
   * Add log handler.
   * @param {import('./AbstractLogHandler.js').AbstractLogHandler} handler - Log handler.
   */
  static addHandler = (handler) => {
    Logger.handlers.push(handler);
  };

  /**
   * Emit log record.
   * @param {Logger} logger - Logger instance.
   * @param {number} level - Log level.
   * @param {string} message - Log message.
   * @param {object} extra - Log extra data.
   * @param {Error | null | undefined} [error] - Log exception.
   */
  static emit = (logger, level, message, extra, error) => {
    const timestamp = Date.now();
    for (const handler of Logger.handlers) {
      if (handler.level >= level) {
        handler.emit(logger, timestamp, level, message, extra, error);
      }
    }
  };

  /**
   * Emit debug log.
   * @param {string} message - Log message.
   * @param {object | null | undefined} [extra] - Log extra data.
   */
  debug(message, extra) {
    Logger.emit(this, LOG_LEVEL_DEBUG, message, extra);
  }

  /**
   * Emit info log.
   * @param {string} message - Log message.
   * @param {object | null | undefined} [extra] - Log extra data.
   */
  info(message, extra) {
    Logger.emit(this, LOG_LEVEL_INFO, message, extra);
  }

  /**
   * Emit warning log.
   * @param {string} message - Log message.
   * @param {object | null | undefined} [extra] - Log extra data.
   */
  warn(message, extra) {
    Logger.emit(this, LOG_LEVEL_WARNING, message, extra);
  }

  /**
   * Emit warning log.
   * @param {string} message - Log message.
   * @param {object | null | undefined} [extra] - Log extra data.
   */
  warning(message, extra) {
    Logger.emit(this, LOG_LEVEL_WARNING, message, extra);
  }

  /**
   * Emit error log.
   * @param {string} message - Log message.
   * @param {object | null | undefined} [extra] - Log extra data.
   */
  error(message, extra) {
    Logger.emit(this, LOG_LEVEL_ERROR, message, extra);
  }

  /**
   * Emit exception log.
   * @param {string} message - Log message.
   * @param {Error} error - Log error.
   * @param {object | null | undefined} [extra] - Log extra data.
   */
  exception(message, error, extra) {
    Logger.emit(this, LOG_LEVEL_FATAL, message, extra, error);
  }
}
