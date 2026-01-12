export function initPageLifecycle(): void;
export function getPageLifecycleState(): string | null | undefined;
export function getDocumentState(): import("./typedef.js").DocumentState | null | undefined;
export function getPageLifecycleEventEmitter(): EventEmitter;
export function isPageLifecycleInitialized(): boolean;
export function addPageLifecycleCallback(state: import("./typedef.js").DocumentState | import("./typedef.js").PageLifecycleState, callback: () => void): void;
import { EventEmitter } from 'eventemitter3';
//# sourceMappingURL=util.d.ts.map