export const LEVEL_DEBUG: 4;
export const LEVEL_INFO: 3;
export const LEVEL_WARN: 2;
export const LEVEL_ERROR: 1;
export const LEVEL_SILENT: 0;
export class Logger {
    /**
     * @type {(error) => {}}
     */
    static exceptionHandler: (error: any) => {};
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
     * @param {object} extraData - TBD.
     */
    debug(message: string, extraData?: object): void;
    /**
     * TBD.
     * @param {string} message - TBD.
     * @param {object} extraData - TBD.
     */
    info(message: string, extraData?: object): void;
    /**
     * TBD.
     * @param {string} message - TBD.
     * @param {object} extraData - TBD.
     */
    warn(message: string, extraData?: object): void;
    /**
     * TBD.
     * @param {string} message - TBD.
     * @param {object} extraData - TBD.
     */
    error(message: string, extraData?: object): void;
    /**
     * TBD.
     * @param {string} message - TBD.
     * @param {Error} exception - TBD.
     */
    exception(message: string, exception: Error): void;
}
//# sourceMappingURL=Logger.d.ts.map