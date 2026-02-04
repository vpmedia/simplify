/**
 * @callback EventListener
 * A function invoked when an event is emitted.
 * @param {...any} args - Arguments passed from the emitter.
 * @returns {void}
 */

/**
 * Internal listener wrapper that stores metadata
 * about a registered event listener.
 */
// oxlint-disable-next-line no-extraneous-class
class Listener {
  /**
   * @param {EventListener} fn - The listener callback function.
   * @param {any} context - The `this` value used when invoking the listener.
   * @param {boolean} [once] - Whether the listener should be invoked only once.
   */
  constructor(fn, context, once = false) {
    /** @type {EventListener} The listener callback */
    this.fn = fn;

    /** @type {any} Execution context for the callback */
    this.context = context;

    /** @type {boolean} Whether this listener is one-time */
    this.once = once;
  }
}

/**
 * Event emitter implementation inspired by Node.js/EventEmitter3.
 * Allows registering, emitting, and removing event listeners.
 */
export class EventEmitter {
  #events;

  constructor() {
    /**
     * Map of event name - array of listener wrappers.
     * @type {Map<string | symbol, Listener[]>}
     */
    this.#events = new Map();
  }

  /**
   * Get all registered event names.
   * @returns {(string | symbol)[]} Array of event identifiers.
   */
  eventNames() {
    return [...this.#events.keys()];
  }

  /**
   * Get all listener functions registered for an event.
   * @param {string | symbol} event - Event name.
   * @returns {EventListener[]} List of listener callbacks.
   */
  listeners(event) {
    const listeners = this.#events.get(event);
    return listeners ? listeners.map((l) => l.fn) : [];
  }

  /**
   * Get the number of listeners registered for an event.
   * @param {string | symbol} event - Event name.
   * @returns {number} Number of listeners.
   */
  listenerCount(event) {
    const listeners = this.#events.get(event);
    return listeners ? listeners.length : 0;
  }

  /**
   * Emit an event, invoking all registered listeners
   * with the provided arguments.
   * @param {string | symbol} event - Event name.
   * @param {...any} args - Arguments passed to listeners.
   * @returns {boolean} True if the event had listeners, otherwise false.
   */
  emit(event, ...args) {
    const listeners = this.#events.get(event);
    if (!listeners || listeners.length === 0) {
      return false;
    }

    // Clone to prevent mutation during iteration
    // eslint-disable-next-line unicorn/no-useless-spread
    for (const listener of [...listeners]) {
      listener.fn.apply(listener.context, args);
      if (listener.once) {
        this.off(event, listener.fn, listener.context);
      }
    }

    return true;
  }

  /**
   * Internal helper for registering a listener.
   * @param {string | symbol} event - Event name.
   * @param {EventListener} fn - Listener callback.
   * @param {any} context - Execution context for the callback.
   * @param {boolean} once - Whether the listener is one-time.
   * @returns {EventEmitter} The emitter instance.
   */
  #addListener(event, fn, context, once) {
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
   * @param {string | symbol} event - Event name.
   * @param {EventListener} fn - Listener callback.
   * @param {any} [context] - Optional execution context.
   * @returns {EventEmitter} The emitter instance.
   */
  on(event, fn, context) {
    return this.#addListener(event, fn, context, false);
  }

  /**
   * Register a one-time listener for an event.
   * The listener is removed after its first invocation.
   * @param {string | symbol} event - Event name.
   * @param {EventListener} fn - Listener callback.
   * @param {any} [context] - Optional execution context.
   * @returns {EventEmitter} The emitter instance.
   */
  once(event, fn, context) {
    return this.#addListener(event, fn, context, true);
  }

  /**
   * Remove a specific listener, or all listeners for an event.
   * @param {string | symbol} event - Event name.
   * @param {EventListener} [fn] - Listener callback to remove.
   * @param {any} [context] - Context to match when removing.
   * @returns {EventEmitter} The emitter instance.
   */
  off(event, fn, context) {
    if (!this.#events.has(event)) {
      return this;
    }

    if (!fn) {
      this.#events.delete(event);
      return this;
    }

    const filtered = this.#events.get(event).filter((listener) => {
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
   * @param {string | symbol} [event] - Optional event name.
   * @returns {EventEmitter} The emitter instance.
   */
  removeAllListeners(event) {
    if (event === undefined) {
      this.#events.clear();
    } else {
      this.#events.delete(event);
    }

    return this;
  }
}
