export class AbstractLogHandler {
    /**
     * Abstract log handler.
     * @param {number} level - Log handler level.
     */
    constructor(level: number);
    level: number;
    /**
     * Emit log record.
     * @param {import('./Logger.js').Logger} logger - Log target.
     * @param {number} level - Log level.
     * @param {string} message - Log message.
     * @param {object} extra - Log extra data.
     * @param {Error} error - Log extra data.
     * @throws {Error}
     */
    emit(logger: import("./Logger.js").Logger, level: number, message: string, extra: object, error: Error): void;
}
//# sourceMappingURL=AbstractLogHandler.d.ts.map