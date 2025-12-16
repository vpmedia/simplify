export class AbstractLogHandler {
    /**
     * Abstract log handler.
     * @param {number} level - Log handler level.
     */
    constructor(level: number);
    level: number;
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
    emit(logger: import("./Logger.js").Logger, timestamp: number, level: number, message: string, extra: object | null | undefined, error: Error | null | undefined): void;
}
//# sourceMappingURL=AbstractLogHandler.d.ts.map