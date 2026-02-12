import { LOG_LEVEL_NAMES } from './const.js';

/**
 * Format log message.
 * @param {import('./Logger.js').Logger} logger - Logger target name.
 * @param {number} timestamp - Log timestamp.
 * @param {number} level - Log level.
 * @param {string} message - Log message.
 * @returns {string} Formatted log message.
 */
export const formatLogMessage = (logger, timestamp, level, message) => `${timestamp} [${logger.name}] ${message}`;

/**
 * Get log level name.
 * @param {number} level - Log level.
 * @returns {string} Log level name.
 */
export const getLogLevelName = (level) => LOG_LEVEL_NAMES[level];

/**
 * Returns the application environment identifier.
 * @returns {string} App environment type.
 */
export const getAppEnvironment = () => {
  let appEnvironment = 'local';
  try {
    if (import.meta['env'].VITE_APP_ENVIRONMENT) {
      appEnvironment = import.meta['env'].VITE_APP_ENVIRONMENT;
    }
  } catch {
    // pass
  }
  try {
    if (process.env.APP_ENVIRONMENT) {
      appEnvironment = process.env.APP_ENVIRONMENT;
    }
  } catch {
    // pass
  }
  return appEnvironment;
};
