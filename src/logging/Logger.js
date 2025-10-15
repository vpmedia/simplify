import { getURLParam } from '../util/getURLParam.js';
import {
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_ERROR,
  LOG_LEVEL_INFO,
  LOG_LEVEL_NAME_DEBUG,
  LOG_LEVEL_NAME_ERROR,
  LOG_LEVEL_NAME_INFO,
  LOG_LEVEL_NAME_WARNING,
  LOG_LEVEL_SILENT,
  LOG_LEVEL_WARNING,
} from './const.js';
import { getAppEnvironment } from './getAppEnvironment.js';
import { formatLogMessage, getLogLevelName } from './util.js';

export class Logger {
  /**
   * @type {(error: Error) => void}
   * @deprecated
   */
  static exceptionHandler = null;
  /**
   * @type {(target: string, level: string, message: string, extraData: object) => void}
   * @deprecated
   */
  static suppressedLogHandler = null;
  /**
   * @type {import('./AbstractLogHandler.js').AbstractLogHandler[]}
   */
  static handlers = [];

  /**
   * Creates a new Logger instance.
   * @param {string} name - The logger name.
   */
  constructor(name) {
    this.name = name;
    const appEnvironment = getAppEnvironment();
    const isProduction = appEnvironment === 'production' || appEnvironment === 'release';
    const defaultLevel = isProduction ? LOG_LEVEL_SILENT : LOG_LEVEL_DEBUG;
    const parameterName = `log_${this.name.toLowerCase()}`;
    this.level = Number.parseInt(getURLParam(parameterName, getURLParam('log_all', defaultLevel)), 10);
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
   * @param {string} target - Log target.
   * @param {number} level - Log level.
   * @param {string} message - Log message.
   * @param {object} extraData - Log extra data.
   * @param {Error} [exception] - Log extra data.
   */
  static emit = (target, level, message, extraData, exception) => {
    for (const handler of Logger.handlers) {
      if (handler.level >= level) {
        handler.emit(target, getLogLevelName(level), message, extraData, exception);
      }
    }
  };

  /**
   * TBD.
   * @param {string} message - TBD.
   * @param {object} [extraData] - TBD.
   */
  debug(message, extraData = null) {
    Logger.emit(this.name, LOG_LEVEL_DEBUG, message, extraData);
    if (this.level < LOG_LEVEL_DEBUG) {
      if (Logger.suppressedLogHandler) {
        Logger.suppressedLogHandler(this.name, LOG_LEVEL_NAME_DEBUG, message, extraData);
      }
      return;
    }
    const logMessage = formatLogMessage(this.name, message);
    if (extraData !== null) {
      console.debug(logMessage, extraData);
      return;
    }
    console.debug(logMessage);
  }

  /**
   * TBD.
   * @param {string} message - TBD.
   * @param {object} [extraData] - TBD.
   */
  info(message, extraData = null) {
    Logger.emit(this.name, LOG_LEVEL_INFO, message, extraData);
    if (this.level < LOG_LEVEL_INFO) {
      if (Logger.suppressedLogHandler) {
        Logger.suppressedLogHandler(this.name, LOG_LEVEL_NAME_INFO, message, extraData);
      }
      return;
    }
    const logMessage = formatLogMessage(this.name, message);
    if (extraData !== null) {
      console.info(logMessage, extraData);
      return;
    }
    console.info(logMessage);
  }

  /**
   * TBD.
   * @param {string} message - TBD.
   * @param {object} [extraData] - TBD.
   */
  warn(message, extraData = null) {
    Logger.emit(this.name, LOG_LEVEL_WARNING, message, extraData);
    if (this.level < LOG_LEVEL_WARNING) {
      if (Logger.suppressedLogHandler) {
        Logger.suppressedLogHandler(this.name, LOG_LEVEL_NAME_WARNING, message, extraData);
      }
      return;
    }
    const logMessage = formatLogMessage(this.name, message);
    if (extraData !== null) {
      console.warn(logMessage, extraData);
      return;
    }
    console.warn(logMessage);
  }

  /**
   * TBD.
   * @param {string} message - TBD.
   * @param {object} [extraData] - TBD.
   */
  error(message, extraData = null) {
    Logger.emit(this.name, LOG_LEVEL_ERROR, message, extraData);
    if (this.level < LOG_LEVEL_ERROR) {
      if (Logger.suppressedLogHandler) {
        Logger.suppressedLogHandler(this.name, LOG_LEVEL_NAME_ERROR, message, extraData);
      }
      return;
    }
    const logMessage = formatLogMessage(this.name, message);
    if (extraData !== null) {
      console.error(logMessage, extraData);
      return;
    }
    console.error(logMessage);
  }

  /**
   * TBD.
   * @param {string} message - TBD.
   * @param {Error} exception - TBD.
   * @param {object} [extraData] - TBD.
   */
  exception(message, exception, extraData = null) {
    Logger.emit(this.name, LOG_LEVEL_ERROR, message, extraData, exception);
    if (Logger.exceptionHandler) {
      Logger.exceptionHandler(exception);
    }
    if (this.level < LOG_LEVEL_ERROR) {
      return;
    }
    const logMessage = formatLogMessage(this.name, message);
    console.error(logMessage, exception);
  }
}
