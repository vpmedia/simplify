import type { Logger } from './Logger.js';

export interface LogExtra {
  tags?: Record<string, string | number | boolean | null | undefined>;
  [key: string]: unknown;
}

export class AbstractLogHandler {
  level: number;

  /**
   * Abstract log handler.
   */
  constructor(level: number) {
    this.level = level;
  }

  /**
   * Emit log record.
   */
  emit(
    _logger: Logger,
    _timestamp: number,
    _level: number,
    _message: string,
    _extra: LogExtra | null | undefined,
    _error: Error | null | undefined
  ): void {
    throw new Error('Not implemented.');
  }
}
