import { addBreadcrumb, captureException, captureMessage, type SeverityLevel } from '@sentry/browser';
import { AbstractLogHandler, type LogExtra } from './AbstractLogHandler.js';
import { LOG_LEVEL_DEBUG, LOG_LEVEL_WARNING } from './const.js';
import type { Logger } from './Logger.js';
import { getLogLevelName } from './util.js';

export class SentryLogHandler extends AbstractLogHandler {
  /**
   * Sentry log handler.
   */
  constructor(level: number = LOG_LEVEL_DEBUG) {
    super(level);
  }

  /**
   * Emit log record.
   */
  override emit(
    logger: Logger,
    _timestamp: number,
    level: number,
    message: string,
    extra: LogExtra | null | undefined,
    error: Error | null | undefined
  ): void {
    const levelName = getLogLevelName(level) as SeverityLevel;
    const logMessage = `[${logger.name}] ${message}`;
    const breadcrumb = {
      type: 'default',
      category: 'console',
      message: logMessage,
      level: levelName,
      data: extra ?? undefined,
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
