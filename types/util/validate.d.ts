export function isBoolean(value: unknown): value is number;
export function isFunction(value: unknown): value is Function;
export function isNumber(value: unknown): value is number;
export function isPositiveNumber(value: unknown): value is number;
export function isNonNegativeNumber(value: unknown): value is number;
export function isInteger(value: unknown): value is number;
export function isPositiveInteger(value: unknown): value is number;
export function isNonNegativeInteger(value: unknown): value is number;
export function isString(value: unknown): value is string;
export function isArray(value: unknown): value is any[];
export function isNull(value: unknown): value is null;
export function isUndefined(value: unknown): value is undefined;
export function isObject(value: unknown): value is object;
export function isInstance<T>(value: unknown, type: new (...args: unknown[]) => T): value is T;
/**
 * <T>
 */
export type Class<T> = new (...args: unknown[]) => T;
//# sourceMappingURL=validate.d.ts.map