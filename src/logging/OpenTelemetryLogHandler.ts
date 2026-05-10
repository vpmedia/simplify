import { AbstractLogHandler, type LogExtra } from './AbstractLogHandler.js';
import type { Logger } from './Logger.js';

export type OpenTelemetryLogEmitter = (
  logger: Logger,
  timestamp: number,
  level: number,
  message: string,
  extra: LogExtra | null | undefined,
  error: Error | null | undefined
) => void;

export class OpenTelemetryLogHandler extends AbstractLogHandler {
  emitter: OpenTelemetryLogEmitter;

  /**
   * Open Telemetry log handler.
   */
  constructor(level: number, emitter: OpenTelemetryLogEmitter) {
    super(level);
    this.emitter = emitter;
  }

  /**
   * Emit log record.
   */
  override emit(
    logger: Logger,
    timestamp: number,
    level: number,
    message: string,
    extra: LogExtra | null | undefined,
    error: Error | null | undefined
  ): void {
    if (!this.emitter) {
      return;
    }
    this.emitter(logger, timestamp, level, message, extra, error);
  }
}
