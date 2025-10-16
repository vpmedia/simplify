export class OpenTelemetryLogHandler extends AbstractLogHandler {
    /**
     * Open Telemetry log handler.
     * @param {number} level - Log handler level.
     * @param {(logger: import('./Logger.js').Logger, timestamp: number, level: number, message: string, extra: object, error: Error) => void} emitter - Log handler emitter.
     */
    constructor(level: number, emitter: (logger: import("./Logger.js").Logger, timestamp: number, level: number, message: string, extra: object, error: Error) => void);
    emitter: (logger: import("./Logger.js").Logger, timestamp: number, level: number, message: string, extra: object, error: Error) => void;
}
import { AbstractLogHandler } from './AbstractLogHandler.js';
//# sourceMappingURL=OpenTelemetryLogHandler.d.ts.map