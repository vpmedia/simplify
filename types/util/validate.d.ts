export class ValidatorError extends TypeError {
    /**
     * Creates a new ValidatorError instance.
     * @param {string} message - Error message.
     */
    constructor(message: string);
}
export function typecheck<T>(value: unknown, validator: (value: unknown) => value is T): T;
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
export function isObject(value: unknown): value is Record<string, unknown>;
export function isInstance<T>(value: unknown, type: new (...args: any[]) => T): value is T;
export function isEnum(value: unknown, choices: unknown[] | Set<string | number> | {
    [key: string | number]: unknown;
}): boolean;
export function isArrayOf<T>(values: unknown[], validator: (value: unknown) => value is T): values is T[];
export function isObjectOf<T>(record: {
    [key: string | number]: any;
}, validator: (value: unknown) => value is T): record is Record<string | number, T>;
//# sourceMappingURL=validate.d.ts.map