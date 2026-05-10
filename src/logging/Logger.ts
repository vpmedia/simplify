import { getURLParam } from '../util/query.js';
import type { AbstractLogHandler, LogExtra } from './AbstractLogHandler.js';
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
  static handlers: AbstractLogHandler[] = [];

  name: string;
  level: number;

  /**
   * Creates a new Logger instance.
   */
  constructor(name: string = ROOT_LOGGER_NAME) {
    this.name = name ?? ROOT_LOGGER_NAME;
    const appEnvironment = getAppEnvironment();
    const isProduction = appEnvironment === 'production' || appEnvironment === 'release';
    const defaultLevel = isProduction ? LOG_LEVEL_SILENT : LOG_LEVEL_DEBUG;
    const parameterName = `log_${this.name.toLowerCase()}`;
    const paramLevel =
      getURLParam(parameterName, getURLParam('log_all', defaultLevel.toString())) ?? defaultLevel.toString();
    this.level = Number.parseInt(paramLevel, 10);
  }

  static addHandler = (handler: AbstractLogHandler): void => {
    Logger.handlers.push(handler);
  };

  static emit = (
    logger: Logger,
    level: number,
    message: string,
    extra?: LogExtra | null,
    error?: Error | null
  ): void => {
    const timestamp = Date.now();
    for (const handler of Logger.handlers) {
      if (handler.level >= level) {
        handler.emit(logger, timestamp, level, message, extra, error);
      }
    }
  };

  debug(message: string, extra?: LogExtra | null): void {
    Logger.emit(this, LOG_LEVEL_DEBUG, message, extra);
  }

  info(message: string, extra?: LogExtra | null): void {
    Logger.emit(this, LOG_LEVEL_INFO, message, extra);
  }

  warn(message: string, extra?: LogExtra | null): void {
    Logger.emit(this, LOG_LEVEL_WARNING, message, extra);
  }

  warning(message: string, extra?: LogExtra | null): void {
    Logger.emit(this, LOG_LEVEL_WARNING, message, extra);
  }

  error(message: string, extra?: LogExtra | null): void {
    Logger.emit(this, LOG_LEVEL_ERROR, message, extra);
  }

  exception(message: string, error: Error, extra?: LogExtra | null): void {
    Logger.emit(this, LOG_LEVEL_FATAL, message, extra, error);
  }
}
