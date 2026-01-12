export class TypeCheckError extends TypeError {
    /**
     * Creates a new `TypeCheckError` instance.
     * @param {string} message - Error message.
     */
    constructor(message: string);
}
export function typeCheck<T>(value: unknown, validator: (value: unknown) => value is T): T;
export function typeCheckArray<T>(value: unknown[], validator: (value: unknown) => value is T): T[];
//# sourceMappingURL=typecheck.d.ts.map