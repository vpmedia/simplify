export class OpenTelemetryLogHandler extends AbstractLogHandler {
    /**
     * Open Telemetry log handler.
     * @param {number} level - Log handler level.
     * @param {(logger: import('./Logger.js').Logger, timestamp: number, level: number, message: string, extra: object | null | undefined, error: Error | null | undefined) => void} emitter - Log handler emitter.
     */
    constructor(level: number, emitter: (logger: import("./Logger.js").Logger, timestamp: number, level: number, message: string, extra: object | null | undefined, error: Error | null | undefined) => void);
    emitter: (logger: import("./Logger.js").Logger, timestamp: number, level: number, message: string, extra: object | null | undefined, error: Error | null | undefined) => void;
}
import { AbstractLogHandler } from './AbstractLogHandler.js';
//# sourceMappingURL=OpenTelemetryLogHandler.d.ts.map