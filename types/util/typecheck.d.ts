export class TypeCheckError extends TypeError {
    /**
     * Creates a new `TypeCheckError` instance.
     * @param {string} message - Error message.
     */
    constructor(message: string);
}
export function typeCheck<T>(value: unknown, validator: (value: unknown) => value is T): T;
export function typeCheckArray<T>(value: unknown[], validator: (value: unknown) => value is T): T[];
/**
 * Export a single shared instance.
 */
export const typeChecker: TypeChecker;
declare class TypeChecker {
    /** @type {TypeChecker} */
    static "__#private@#instance": TypeChecker;
    /**
     * Enable or disable swallowing of TypeCheckErrors.
     * @param {boolean} value - Swallow errors flag.
     */
    setSwallowErrors(value: boolean): void;
    /**
     * Type check a single value.
     * @template T
     * @param {unknown} value - The value to check.
     * @param {(value: unknown) => value is T} validator - The validator to check with.
     * @returns {T | null} - The type checked value.
     */
    check<T>(value: unknown, validator: (value: unknown) => value is T): T | null;
    /**
     * Type check an array of values.
     * @template T
     * @param {unknown[]} value - The value to check.
     * @param {(value: unknown) => value is T} validator - The validator to check the array with.
     * @returns {T[] | null} - The type checked value.
     */
    checkArray<T>(value: unknown[], validator: (value: unknown) => value is T): T[] | null;
    #private;
}
export {};
//# sourceMappingURL=typecheck.d.ts.map