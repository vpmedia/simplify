export function typeCheck<T>(value: unknown, validator: (value: unknown) => value is T): T;
export function typeCheckArray<T>(value: unknown[], validator: (value: unknown) => value is T): T[];
export function typeCheckEnum(value: string | number, choices: (string | number)[] | Set<string | number> | Record<string | number, string | number>): string | number;
//# sourceMappingURL=util.d.ts.map