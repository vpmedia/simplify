/**
 * Event emitter implementation inspired by Node.js/EventEmitter3.
 * Allows registering, emitting, and removing event listeners.
 */
export class EventEmitter {
    /**
     * Get all registered event names.
     * @returns {(string | symbol)[]} Array of event identifiers.
     */
    eventNames(): (string | symbol)[];
    /**
     * Get all listener functions registered for an event.
     * @param {string | symbol} event - Event name.
     * @returns {EventListener[]} List of listener callbacks.
     */
    listeners(event: string | symbol): EventListener[];
    /**
     * Get the number of listeners registered for an event.
     * @param {string | symbol} event - Event name.
     * @returns {number} Number of listeners.
     */
    listenerCount(event: string | symbol): number;
    /**
     * Emit an event, invoking all registered listeners
     * with the provided arguments.
     * @param {string | symbol} event - Event name.
     * @param {...any} args - Arguments passed to listeners.
     * @returns {boolean} True if the event had listeners, otherwise false.
     */
    emit(event: string | symbol, ...args: any[]): boolean;
    /**
     * Register a persistent listener for an event.
     * @param {string | symbol} event - Event name.
     * @param {EventListener} fn - Listener callback.
     * @param {any} [context] - Optional execution context.
     * @returns {EventEmitter} The emitter instance.
     */
    on(event: string | symbol, fn: EventListener, context?: any): EventEmitter;
    /**
     * Register a one-time listener for an event.
     * The listener is removed after its first invocation.
     * @param {string | symbol} event - Event name.
     * @param {EventListener} fn - Listener callback.
     * @param {any} [context] - Optional execution context.
     * @returns {EventEmitter} The emitter instance.
     */
    once(event: string | symbol, fn: EventListener, context?: any): EventEmitter;
    /**
     * Remove a specific listener, or all listeners for an event.
     * @param {string | symbol} event - Event name.
     * @param {EventListener} [fn] - Listener callback to remove.
     * @param {any} [context] - Context to match when removing.
     * @returns {EventEmitter} The emitter instance.
     */
    off(event: string | symbol, fn?: EventListener, context?: any): EventEmitter;
    /**
     * Remove all listeners from the emitter,
     * or all listeners for a specific event.
     * @param {string | symbol} [event] - Optional event name.
     * @returns {EventEmitter} The emitter instance.
     */
    removeAllListeners(event?: string | symbol): EventEmitter;
    #private;
}
/**
 * A function invoked when an event is emitted.
 */
export type EventListener = (...args: any[]) => void;
//# sourceMappingURL=event_emitter.d.ts.map