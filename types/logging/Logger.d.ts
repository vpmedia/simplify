export class Logger {
    /**
     * @type {import('./AbstractLogHandler.js').AbstractLogHandler[]}
     */
    static handlers: import("./AbstractLogHandler.js").AbstractLogHandler[];
    /**
     * Add log handler.
     * @param {import('./AbstractLogHandler.js').AbstractLogHandler} handler - Log handler.
     */
    static addHandler: (handler: import("./AbstractLogHandler.js").AbstractLogHandler) => void;
    /**
     * Emit log record.
     * @param {Logger} logger - Log target.
     * @param {number} level - Log level.
     * @param {string} message - Log message.
     * @param {object} extra - Log extra data.
     * @param {Error} [error] - Log exception.
     */
    static emit: (logger: Logger, level: number, message: string, extra: object, error?: Error) => void;
    /**
     * Creates a new Logger instance.
     * @param {string} [name] - The logger name.
     */
    constructor(name?: string);
    name: string;
    level: number;
    /**
     * Emit debug log.
     * @param {string} message - Log message.
     * @param {object} [extra] - Log extra data.
     */
    debug(message: string, extra?: object): void;
    /**
     * Emit info log.
     * @param {string} message - Log message.
     * @param {object} [extra] - Log extra data.
     */
    info(message: string, extra?: object): void;
    /**
     * Emit warning log.
     * @param {string} message - Log message.
     * @param {object} [extra] - Log extra data.
     */
    warn(message: string, extra?: object): void;
    /**
     * Emit warning log.
     * @param {string} message - Log message.
     * @param {object} [extra] - Log extra data.
     */
    warning(message: string, extra?: object): void;
    /**
     * Emit error log.
     * @param {string} message - Log message.
     * @param {object} [extra] - Log extra data.
     */
    error(message: string, extra?: object): void;
    /**
     * Emit exception log.
     * @param {string} message - Log message.
     * @param {Error} error - Log error.
     * @param {object} [extra] - Log extra data.
     */
    exception(message: string, error: Error, extra?: object): void;
}
//# sourceMappingURL=Logger.d.ts.map