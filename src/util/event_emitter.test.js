/* eslint-disable unicorn/prefer-event-target, no-empty-function, no-invalid-this, func-names, func-style, unicorn/consistent-function-scoping */

import { describe, it, expect } from 'vitest';
import { EventEmitter } from './event_emitter.js';

describe('EventEmitter3 basics', () => {
  it('can be instantiated', () => {
    const e = new EventEmitter();
    expect(e).toBeInstanceOf(EventEmitter);
  });

  it('supports subclassing', () => {
    class Beast extends EventEmitter {}
    const beast = new Beast();

    expect(beast).toBeInstanceOf(Beast);
    expect(beast).toBeInstanceOf(EventEmitter);
  });
});

describe('emit()', () => {
  it('returns false when no listeners exist', () => {
    const e = new EventEmitter();
    expect(e.emit('foo')).toBe(false);
  });

  it('returns true when listeners exist', () => {
    const e = new EventEmitter();
    e.on('foo', () => {});
    expect(e.emit('foo')).toBe(true);
  });

  it('invokes listeners with provided arguments', async () => {
    const e = new EventEmitter();

    await new Promise((resolve) => {
      e.on('foo', (a, b) => {
        expect(a).toBe(1);
        expect(b).toBe(2);
        resolve();
      });

      e.emit('foo', 1, 2);
    });
  });

  it('binds the correct context', async () => {
    const e = new EventEmitter();
    const ctx = { value: 42 };

    await new Promise((resolve) => {
      e.on(
        'foo',
        function () {
          // @ts-expect-error
          expect(this).toBe(ctx);
          resolve();
        },
        ctx
      );

      e.emit('foo');
    });
  });

  it('supports many listeners for the same event', () => {
    const e = new EventEmitter();
    const calls = [];

    e.on('foo', () => calls.push(1));
    e.on('foo', () => calls.push(2));

    e.emit('foo');

    expect(calls).toEqual([1, 2]);
  });
});

describe('once()', () => {
  it('fires the listener only once', () => {
    const e = new EventEmitter();
    let calls = 0;

    e.once('foo', () => {
      calls += 1;
    });

    e.emit('foo');
    e.emit('foo');

    expect(calls).toBe(1);
    expect(e.listenerCount('foo')).toBe(0);
  });

  it('passes arguments correctly', async () => {
    const e = new EventEmitter();

    await new Promise((resolve) => {
      e.once('foo', (...args) => {
        expect(args).toEqual([1, 2, 3]);
        resolve();
      });

      e.emit('foo', 1, 2, 3);
    });
  });
});

describe('listeners() and listenerCount()', () => {
  it('returns an empty array when no listeners exist', () => {
    const e = new EventEmitter();
    expect(e.listeners('foo')).toEqual([]);
    expect(e.listenerCount('foo')).toBe(0);
  });

  it('returns only listener functions (not internals)', () => {
    const e = new EventEmitter();
    function fn() {}

    e.on('foo', fn);

    expect(e.listeners('foo')).toEqual([fn]);
  });

  it('does not expose internal listener storage', () => {
    const e = new EventEmitter();
    function fn() {}

    e.on('foo', fn);
    const listeners = e.listeners('foo');
    listeners.push(() => {});

    expect(e.listeners('foo')).toEqual([fn]);
  });
});

describe('off()', () => {
  it('removes all listeners for an event when fn is omitted', () => {
    const e = new EventEmitter();

    e.on('foo', () => {});
    e.on('foo', () => {});

    e.off('foo');

    expect(e.listenerCount('foo')).toBe(0);
  });

  it('removes a specific listener', () => {
    const e = new EventEmitter();
    function fn() {}

    e.on('foo', fn);
    e.off('foo', fn);

    expect(e.listeners('foo')).toEqual([]);
  });

  it('removes listeners matching both function and context', () => {
    const e = new EventEmitter();
    const ctx1 = {};
    const ctx2 = {};
    function fn() {}

    e.on('foo', fn, ctx1);
    e.on('foo', fn, ctx2);

    e.off('foo', fn, ctx1);

    expect(e.listenerCount('foo')).toBe(1);
  });
});

describe('removeAllListeners()', () => {
  it('removes listeners for a single event', () => {
    const e = new EventEmitter();

    e.on('foo', () => {});
    e.on('bar', () => {});

    e.removeAllListeners('foo');

    expect(e.listenerCount('foo')).toBe(0);
    expect(e.listenerCount('bar')).toBe(1);
  });

  it('removes all listeners when no event is specified', () => {
    const e = new EventEmitter();

    e.on('foo', () => {});
    e.on('bar', () => {});

    e.removeAllListeners();

    expect(e.eventNames()).toEqual([]);
  });
});

describe('eventNames()', () => {
  it('returns an empty array when no events exist', () => {
    const e = new EventEmitter();
    expect(e.eventNames()).toEqual([]);
  });

  it('returns all registered event names', () => {
    const e = new EventEmitter();

    e.on('foo', () => {});
    e.on('bar', () => {});

    expect(e.eventNames()).toContain('foo');
    expect(e.eventNames()).toContain('bar');
  });

  it('supports symbol event names', () => {
    const e = new EventEmitter();
    const sym = Symbol('test');

    e.on(sym, () => {});
    expect(e.eventNames()).toContain(sym);
  });

  it('events map is instance field', () => {
    const e1 = new EventEmitter();
    const e2 = new EventEmitter();
    e1.on('event', () => {});
    expect(e1.listenerCount('event')).toBe(1);
    expect(e1.listenerCount('no-event')).toBe(0);
    expect(e2.listenerCount('event')).toBe(0);
  });
});
