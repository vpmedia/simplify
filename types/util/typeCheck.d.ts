export class TypeCheckError extends TypeError {
    /**
     * Creates a new `TypeCheckError` instance.
     * @param {string} message - Error message.
     */
    constructor(message: string);
}
export function typeCheck<T>(value: unknown, validator: (value: unknown) => value is T): T;
export function typeCheckArray<T>(value: unknown[], validator: (value: unknown) => value is T): T[];
export function isBoolean(value: unknown): value is boolean;
export function isFunction(value: unknown): value is (...args: any[]) => any;
export function isNumber(value: unknown): value is number;
export function isPositiveNumber(value: unknown): value is number;
export function isNonNegativeNumber(value: unknown): value is number;
export function isInteger(value: unknown): value is number;
export function isPositiveInteger(value: unknown): value is number;
export function isNonNegativeInteger(value: unknown): value is number;
export function isString(value: unknown): value is string;
export function isArray<T>(value: unknown): value is T[];
export function isNull(value: unknown): value is null;
export function isUndefined(value: unknown): value is undefined;
export function isPlainObject(value: unknown): value is Record<string, unknown>;
export function isInstance<T>(value: unknown, type: new (...args: any[]) => T): value is T;
export function isEnum(value: unknown, choices: unknown[] | Set<string | number> | {
    [key: string | number]: unknown;
}): boolean;
export function isArrayOf<T>(values: unknown, validator: (value: unknown) => value is T): values is T[];
export function isPlainObjectOf<T>(record: {
    [key: string | number]: any;
}, validator: (value: unknown) => value is T): record is Record<string | number, T>;
export function isAnyOf<A, B>(value: unknown, a: (value: unknown) => value is A, b: (value: unknown) => value is B): value is A | B;
export function isRefined<T>(base: (value: unknown) => value is T, predicate: (value: T) => boolean): (value: unknown) => value is T;
export function isNumberGreaterThan(min: any): (value: unknown) => value is number;
export function isNumberLessThan(max: any): (value: unknown) => value is number;
export function isNumberInRange(min: any, max: any): (value: unknown) => value is number;
export function isIntegerGreaterThan(min: any): (value: unknown) => value is number;
export function isIntegerLessThan(max: any): (value: unknown) => value is number;
export function isIntegerInRange(min: any, max: any): (value: unknown) => value is number;
export function isStringWithMinLength(min: any): (value: unknown) => value is string;
export function isStringWithMaxLength(max: any): (value: unknown) => value is string;
export function isStringWithLength(length: any): (value: unknown) => value is string;
export function isStringMatches(regex: any): (value: unknown) => value is string;
export function isArrayWithMinSize(min: any): (value: unknown) => value is unknown[];
export function isArrayWithMaxSize(max: any): (value: unknown) => value is unknown[];
export function isArrayWithSize(size: any): (value: unknown) => value is unknown[];
//# sourceMappingURL=typeCheck.d.ts.map