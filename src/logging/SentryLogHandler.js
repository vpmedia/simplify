import { addBreadcrumb, captureException, captureMessage } from '@sentry/browser';
import { AbstractLogHandler } from './AbstractLogHandler.js';
import { LOG_LEVEL_DEBUG, LOG_LEVEL_WARNING } from './const.js';
import { getLogLevelName } from './util.js';

export class SentryLogHandler extends AbstractLogHandler {
  /**
   * Console log handler.
   * @param {number} level - Log handler level.
   */
  constructor(level = LOG_LEVEL_DEBUG) {
    super(level);
  }

  /**
   * Emit log record.
   * @param {import('./Logger.js').Logger} logger - Logger instance.
   * @param {number} timestamp - Log timestamp.
   * @param {number} level - Log level.
   * @param {string} message - Log message.
   * @param {object} extra - Log extra data.
   * @param {Error} error - Log error.
   * @throws {Error}
   */
  emit(logger, timestamp, level, message, extra, error) {
    /** @type {import('@sentry/browser').SeverityLevel} */
    // @ts-ignore
    const levelName = getLogLevelName(level);
    const logMessage = `[${logger.name}] ${message}`;
    const breadcrumb = {
      type: 'default',
      category: 'console',
      message: logMessage,
      level: levelName,
      data: extra === undefined ? undefined : { extra },
    };
    addBreadcrumb(breadcrumb);
    if (error) {
      extra?.tags ? captureException(error, { tags: extra.tags }) : captureException(error);
    } else if (level === LOG_LEVEL_WARNING) {
      extra?.tags
        ? captureMessage(logMessage, { level: 'warning', tags: extra.tags })
        : captureMessage(logMessage, { level: 'warning' });
    }
  }
}
