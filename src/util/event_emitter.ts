export type EventListener = (...args: any[]) => void;

/**
 * Internal listener wrapper that stores metadata
 * about a registered event listener.
 */
class Listener {
  fn: EventListener;
  context: unknown;
  once: boolean;

  constructor(fn: EventListener, context: unknown, once = false) {
    this.fn = fn;
    this.context = context;
    this.once = once;
  }
}

/**
 * Event emitter implementation inspired by Node.js/EventEmitter3.
 */
export class EventEmitter {
  #events: Map<string | symbol, Listener[]>;

  constructor() {
    this.#events = new Map();
  }

  /**
   * Get all registered event names.
   */
  eventNames(): (string | symbol)[] {
    return [...this.#events.keys()];
  }

  /**
   * Get all listener functions registered for an event.
   */
  listeners(event: string | symbol): EventListener[] {
    const listeners = this.#events.get(event);
    return listeners ? listeners.map((l) => l.fn) : [];
  }

  /**
   * Get the number of listeners registered for an event.
   */
  listenerCount(event: string | symbol): number {
    const listeners = this.#events.get(event);
    return listeners ? listeners.length : 0;
  }

  /**
   * Emit an event, invoking all registered listeners.
   */
  emit(event: string | symbol, ...args: unknown[]): boolean {
    const listeners = this.#events.get(event);
    if (!listeners || listeners.length === 0) {
      return false;
    }

    for (const listener of [...listeners]) {
      listener.fn.apply(listener.context, args);
      if (listener.once) {
        this.off(event, listener.fn, listener.context);
      }
    }

    return true;
  }

  #addListener(event: string | symbol, fn: EventListener, context: unknown, once: boolean): this {
    if (typeof fn !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const listener = new Listener(fn, context ?? this, once);
    const listeners = this.#events.get(event);

    if (listeners) {
      listeners.push(listener);
    } else {
      this.#events.set(event, [listener]);
    }

    return this;
  }

  /**
   * Register a persistent listener for an event.
   */
  on(event: string | symbol, fn: EventListener, context?: unknown): this {
    return this.#addListener(event, fn, context, false);
  }

  /**
   * Register a one-time listener for an event.
   */
  once(event: string | symbol, fn: EventListener, context?: unknown): this {
    return this.#addListener(event, fn, context, true);
  }

  /**
   * Remove a specific listener, or all listeners for an event.
   */
  off(event: string | symbol, fn?: EventListener, context?: unknown): this {
    if (!this.#events.has(event)) {
      return this;
    }

    if (!fn) {
      this.#events.delete(event);
      return this;
    }

    const filtered = this.#events.get(event)!.filter((listener) => {
      if (listener.fn !== fn) {
        return true;
      }
      if (context !== undefined && listener.context !== context) {
        return true;
      }
      return false;
    });

    if (filtered.length > 0) {
      this.#events.set(event, filtered);
    } else {
      this.#events.delete(event);
    }

    return this;
  }

  /**
   * Remove all listeners from the emitter,
   * or all listeners for a specific event.
   */
  removeAllListeners(event?: string | symbol): this {
    if (event === undefined) {
      this.#events.clear();
    } else {
      this.#events.delete(event);
    }

    return this;
  }
}
