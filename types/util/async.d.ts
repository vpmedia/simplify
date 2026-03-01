export function delayPromise(delayMS: number): Promise<void>;
export function retryAsync<T>(method: () => Promise<T>, numTries?: number, delayMs?: number): Promise<T>;
export function loadJSON(url: string): Promise<unknown>;
//# sourceMappingURL=async.d.ts.map