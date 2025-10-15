import { LOG_LEVEL_NAMES } from './const.js';

/**
 * Format log message.
 * @param {string} name - Log target name.
 * @param {string} message - Log target message.
 * @returns {string} Formatted log message.
 */
export const formatLogMessage = (name, message) => `${Date.now()} [${name}] ${message}`;

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
