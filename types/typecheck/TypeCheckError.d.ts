export class TypeCheckError extends TypeError {
    /**
     * Creates a new `TypeCheckError` instance.
     * @param {string} message - Error message.
     * @param {{ cause?: unknown, value?: unknown }} [options] - Error options.
     */
    constructor(message: string, options?: {
        cause?: unknown;
        value?: unknown;
    });
    value: unknown;
}
//# sourceMappingURL=TypeCheckError.d.ts.map