import { getURLParam } from '../util/getURLParam.js';
import { getAppEnvironment } from './getAppEnvironment.js';

export const LEVEL_DEBUG = 4;
export const LEVEL_INFO = 3;
export const LEVEL_WARN = 2;
export const LEVEL_ERROR = 1;
export const LEVEL_SILENT = 0;

export class Logger {
  /**
   * @type {(error) => {}}
   */
  static exceptionHandler = null;

  /**
   * Creates a new Logger instance.
   * @param {string} name - The logger name.
   */
  constructor(name) {
    this.name = name;
    const appEnvironment = getAppEnvironment();
    const isProduction = appEnvironment === 'production' || appEnvironment === 'release';
    const defaultLevel = isProduction ? LEVEL_SILENT : LEVEL_DEBUG;
    const parameterName = `log_${this.name.toLowerCase()}`;
    this.level = Number.parseInt(getURLParam(parameterName, getURLParam('log_all', defaultLevel)), 10);
  }

  /**
   * TBD.
   * @param {string} message - TBD.
   * @param {object} extraData - TBD.
   */
  debug(message, extraData = null) {
    if (this.level < LEVEL_DEBUG) {
      return;
    }
    const logMessage = `${Date.now()} [${this.name}] ${message}`;
    if (extraData !== null) {
      console.debug(logMessage, extraData);
      return;
    }
    console.debug(logMessage);
  }

  /**
   * TBD.
   * @param {string} message - TBD.
   * @param {object} extraData - TBD.
   */
  info(message, extraData = null) {
    if (this.level < LEVEL_INFO) {
      return;
    }
    const logMessage = `${Date.now()} [${this.name}] ${message}`;
    if (extraData !== null) {
      console.info(logMessage, extraData);
      return;
    }
    console.info(logMessage);
  }

  /**
   * TBD.
   * @param {string} message - TBD.
   * @param {object} extraData - TBD.
   */
  warn(message, extraData = null) {
    if (this.level < LEVEL_WARN) {
      return;
    }
    const logMessage = `${Date.now()} [${this.name}] ${message}`;
    if (extraData !== null) {
      console.warn(logMessage, extraData);
      return;
    }
    console.warn(logMessage);
  }

  /**
   * TBD.
   * @param {string} message - TBD.
   * @param {object} extraData - TBD.
   */
  error(message, extraData = null) {
    if (this.level < LEVEL_ERROR) {
      return;
    }
    const logMessage = `${Date.now()} [${this.name}] ${message}`;
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
   */
  exception(message, exception) {
    if (Logger.exceptionHandler) {
      Logger.exceptionHandler(exception);
    }
    if (this.level < LEVEL_ERROR) {
      return;
    }
    const logMessage = `${Date.now()} [${this.name}] ${message}`;
    console.error(logMessage, exception);
  }
}
