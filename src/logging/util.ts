import type { Logger } from './Logger.js';
import { LOG_LEVEL_NAMES } from './const.js';

/**
 * Format log message.
 */
export const formatLogMessage = (logger: Logger, timestamp: number, _level: number, message: string): string =>
  `${timestamp} [${logger.name}] ${message}`;

/**
 * Get log level name.
 */
export const getLogLevelName = (level: number): string | undefined => LOG_LEVEL_NAMES[level];

/**
 * Returns the application environment identifier.
 */
export const getAppEnvironment = (): string => {
  let appEnvironment = 'local';
  try {
    const { env } = import.meta as unknown as { env?: Record<string, string | undefined> };
    if (env?.['VITE_APP_ENVIRONMENT']) {
      appEnvironment = env['VITE_APP_ENVIRONMENT'];
    }
  } catch {
    // pass
  }
  try {
    if (process.env['APP_ENVIRONMENT']) {
      appEnvironment = process.env['APP_ENVIRONMENT'];
    }
  } catch {
    // pass
  }
  return appEnvironment;
};
