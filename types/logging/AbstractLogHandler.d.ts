export class AbstractLogHandler {
    /**
     * Abstract log handler.
     * @param {number} level - Log level.
     */
    constructor(level: number);
    level: number;
    /**
     * Emit log record.
     * @param {string} target - Log target.
     * @param {string} levelName - Log level.
     * @param {string} message - Log message.
     * @param {object} extraData - Log extra data.
     * @param {Error} exception - Log extra data.
     * @throws {Error}
     */
    emit(target: string, levelName: string, message: string, extraData: object, exception: Error): void;
}
//# sourceMappingURL=AbstractLogHandler.d.ts.map