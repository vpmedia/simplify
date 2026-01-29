import { beforeAll, describe, expect, it } from 'vitest';
import {
  DOCUMENT_STATE_CHANGE_EVENT,
  DOCUMENT_STATES,
  PAGE_LIFECYCLE_STATE_CHANGE_EVENT,
  PAGE_LIFECYCLE_STATE_HIDDEN,
  PAGE_LIFECYCLE_STATES,
} from './const.js';
import {
  addPageLifecycleCallback,
  getDocumentState,
  getPageLifecycleEventEmitter,
  getPageLifecycleState,
  initPageLifecycle,
  isPageLifecycleInitialized,
} from './util.js';
import { delayPromise } from '../util/async.js';

describe('Page Lifecycle', () => {
  beforeAll(() => {
    initPageLifecycle();
  });

  it('should initialize page lifecycle', () => {
    expect(isPageLifecycleInitialized()).toBe(true);
  });

  it('should return current page lifecycle state', () => {
    const state = getPageLifecycleState();
    expect(state).toBeOneOf(PAGE_LIFECYCLE_STATES);
  });

  it('should return current document state', () => {
    const state = getDocumentState();
    expect(state).toBeOneOf(DOCUMENT_STATES);
  });

  it('should return event emitter instance', () => {
    const emitter = getPageLifecycleEventEmitter();
    expect(emitter).toBeDefined();
  });

  it('should handle page lifecycle state changes', () => {
    const emitter = getPageLifecycleEventEmitter();
    let stateChanged = false;

    emitter.on(PAGE_LIFECYCLE_STATE_CHANGE_EVENT, (data) => {
      stateChanged = true;
      expect(data).toHaveProperty('previousState');
      expect(data).toHaveProperty('nextState');
    });

    // Trigger visibility change
    const originalVisibilityState = document.visibilityState;
    Object.defineProperty(document, 'visibilityState', {
      value: originalVisibilityState === 'visible' ? 'hidden' : 'visible',
      writable: true,
      configurable: true,
    });

    document.dispatchEvent(new Event('visibilitychange'));

    // Restore original state
    Object.defineProperty(document, 'visibilityState', {
      value: originalVisibilityState,
      writable: true,
      configurable: true,
    });

    expect(stateChanged).toBe(true);
  });

  it('should handle document state changes', () => {
    const emitter = getPageLifecycleEventEmitter();
    let stateChanged = false;

    emitter.on(DOCUMENT_STATE_CHANGE_EVENT, (data) => {
      stateChanged = true;
      expect(data).toHaveProperty('previousState');
      expect(data).toHaveProperty('nextState');
    });

    // Trigger ready state change
    const originalReadyState = document.readyState;
    Object.defineProperty(document, 'readyState', {
      value: originalReadyState === 'complete' ? 'interactive' : 'complete',
      writable: true,
      configurable: true,
    });

    document.dispatchEvent(new Event('readystatechange'));

    // Restore original state
    Object.defineProperty(document, 'readyState', {
      value: originalReadyState,
      writable: true,
      configurable: true,
    });

    expect(stateChanged).toBe(true);
  });
});
