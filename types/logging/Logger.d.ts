export class Logger {
    /**
     * @type {(error: Error) => void}
     * @deprecated
     */
    static exceptionHandler: (error: Error) => void;
    /**
     * @type {(target: string, level: string, message: string, extraData: object) => void}
     * @deprecated
     */
    static suppressedLogHandler: (target: string, level: string, message: string, extraData: object) => void;
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
     * @param {string} target - Log target.
     * @param {number} level - Log level.
     * @param {string} message - Log message.
     * @param {object} extraData - Log extra data.
     * @param {Error} [exception] - Log extra data.
     */
    static emit: (target: string, level: number, message: string, extraData: object, exception?: Error) => void;
    /**
     * Creates a new Logger instance.
     * @param {string} name - The logger name.
     */
    constructor(name: string);
    name: string;
    level: number;
    /**
     * TBD.
     * @param {string} message - TBD.
     * @param {object} [extraData] - TBD.
     */
    debug(message: string, extraData?: object): void;
    /**
     * TBD.
     * @param {string} message - TBD.
     * @param {object} [extraData] - TBD.
     */
    info(message: string, extraData?: object): void;
    /**
     * TBD.
     * @param {string} message - TBD.
     * @param {object} [extraData] - TBD.
     */
    warn(message: string, extraData?: object): void;
    /**
     * TBD.
     * @param {string} message - TBD.
     * @param {object} [extraData] - TBD.
     */
    error(message: string, extraData?: object): void;
    /**
     * TBD.
     * @param {string} message - TBD.
     * @param {Error} exception - TBD.
     * @param {object} [extraData] - TBD.
     */
    exception(message: string, exception: Error, extraData?: object): void;
}
//# sourceMappingURL=Logger.d.ts.map