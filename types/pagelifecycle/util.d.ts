export function addPageLifecycleCallback(state: import("./typedef.js").DocumentState | import("./typedef.js").PageLifecycleState, callback: () => void): void;
export function initPageLifecycle(): void;
export function getPageLifecycleState(): string;
export function getDocumentState(): import("./typedef.js").DocumentState;
export function getPageLifecycleEventEmitter(): EventEmitter;
export function isPageLifecycleInitialized(): boolean;
import { EventEmitter } from 'eventemitter3';
//# sourceMappingURL=util.d.ts.map