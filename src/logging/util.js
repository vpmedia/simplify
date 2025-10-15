import { LOG_LEVEL_NAMES } from './const.js';

/**
 * Format log message.
 * @param {string} loggerName - Log target name.
 * @param {string} logMessage - Log target message.
 * @returns {string} Formatted log message.
 */
export const formatLogMessage = (loggerName, logMessage) => `${Date.now()} [${loggerName}] ${logMessage}`;

/**
 * Get log level name.
 * @param {number} logLevel - Log level.
 * @returns {string} Log level name.
 */
export const getLogLevelName = (logLevel) => LOG_LEVEL_NAMES[logLevel];
