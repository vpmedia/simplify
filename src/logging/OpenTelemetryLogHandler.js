import { AbstractLogHandler } from './AbstractLogHandler.js';
import { LOG_LEVEL_DEBUG } from './const.js';

export class OpenTelemetryLogHandler extends AbstractLogHandler {
  /**
   * Open Telemetry log handler.
   * @param {number} level - Log handler level.
   * @param {(logger: import('./Logger.js').Logger, timestamp: number, level: number, message: string, extra: object | null | undefined, error: Error | null | undefined) => void} emitter - Log handler emitter.
   */
  constructor(level, emitter) {
    super(level);
    this.emitter = emitter;
  }

  /**
   * Emit log record.
   * @param {import('./Logger.js').Logger} logger - Logger instance.
   * @param {number} timestamp - Log timestamp.
   * @param {number} level - Log level.
   * @param {string} message - Log message.
   * @param {object | null | undefined} extra - Log extra data.
   * @param {Error | null | undefined} error - Log error.
   * @throws {Error}
   */
  emit(logger, timestamp, level, message, extra, error) {
    if (!this.emitter) {
      return;
    }
    this.emitter(logger, timestamp, level, message, extra, error);
  }
}
