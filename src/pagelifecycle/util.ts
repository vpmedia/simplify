/**
 * Page lifecycle helper.
 * @see https://developer.chrome.com/docs/web-platform/page-lifecycle-api
 */

import { Logger } from '../logging/Logger.js';
import { EventEmitter } from '../util/event_emitter.js';
import {
  DOCUMENT_STATE_CHANGE_EVENT,
  DOCUMENT_STATE_DOM_LOADED,
  DOCUMENT_STATE_FULLY_LOADED,
  PAGE_LIFECYCLE_STATE_ACTIVE,
  PAGE_LIFECYCLE_STATE_CHANGE_EVENT,
  PAGE_LIFECYCLE_STATE_FROZEN,
  PAGE_LIFECYCLE_STATE_HIDDEN,
  PAGE_LIFECYCLE_STATE_PASSIVE,
  PAGE_LIFECYCLE_STATE_TERMINATED,
} from './const.js';
import type { DocumentState, PageLifecycleState } from './typedef.js';

const logger = new Logger('pagelifecycle');

const eventEmitter = new EventEmitter();

let currentPageLifecycleState: PageLifecycleState | null | undefined = null;

let currentDocumentState: DocumentState | null | undefined = null;

let isInitialized = false;

const callbacks: Record<string, (() => void)[]> = {};

/**
 * Run callbacks for a specific state change.
 */
const processCallbacks = (state: DocumentState | PageLifecycleState): void => {
  const stateCallbacks = callbacks[state];
  if (!stateCallbacks) {
    return;
  }
  for (const callback of stateCallbacks) {
    callback();
  }
  stateCallbacks.length = 0;
};

/**
 * Detects the current page lifecycle state.
 */
const detectPageLifecycleState = (): PageLifecycleState => {
  if (document.visibilityState === 'hidden') {
    return PAGE_LIFECYCLE_STATE_HIDDEN;
  }
  if (document.hasFocus()) {
    return PAGE_LIFECYCLE_STATE_ACTIVE;
  }
  return PAGE_LIFECYCLE_STATE_PASSIVE;
};

/**
 * Handles page lifecycle state change.
 */
const onPageLifecycleStateChange = (nextState: PageLifecycleState): void => {
  const previousState = currentPageLifecycleState;
  if (nextState !== previousState) {
    currentPageLifecycleState = nextState;
    const eventData = { previousState, nextState };
    logger.info(PAGE_LIFECYCLE_STATE_CHANGE_EVENT, eventData);
    eventEmitter.emit(PAGE_LIFECYCLE_STATE_CHANGE_EVENT, eventData);
    processCallbacks(currentPageLifecycleState);
  }
};

/**
 * Handles document state change.
 */
const onDocumentStateChange = (nextState: DocumentState): void => {
  const previousState = currentDocumentState;
  if (nextState !== previousState) {
    currentDocumentState = nextState;
    const eventData = { previousState, nextState };
    logger.info(DOCUMENT_STATE_CHANGE_EVENT, eventData);
    eventEmitter.emit(DOCUMENT_STATE_CHANGE_EVENT, eventData);
    processCallbacks(currentDocumentState);
  }
};

/**
 * Initialize page lifecycle observer.
 */
export const initPageLifecycle = (): void => {
  if (isInitialized) {
    return;
  }
  logger.info('initPageLifecycle');
  onPageLifecycleStateChange(detectPageLifecycleState());
  onDocumentStateChange(document.readyState);
  const options = { capture: true };
  document.addEventListener('visibilitychange', () => onPageLifecycleStateChange(detectPageLifecycleState()), options);
  globalThis.addEventListener('pageshow', () => onPageLifecycleStateChange(detectPageLifecycleState()), options);
  globalThis.addEventListener('focus', () => onPageLifecycleStateChange(detectPageLifecycleState()), options);
  globalThis.addEventListener('blur', () => onPageLifecycleStateChange(detectPageLifecycleState()), options);
  document.addEventListener('resume', () => onPageLifecycleStateChange(detectPageLifecycleState()), options);
  document.addEventListener('freeze', () => onPageLifecycleStateChange(PAGE_LIFECYCLE_STATE_FROZEN), options);
  globalThis.addEventListener(
    'pagehide',
    (event) =>
      onPageLifecycleStateChange(event.persisted ? PAGE_LIFECYCLE_STATE_FROZEN : PAGE_LIFECYCLE_STATE_TERMINATED),
    options
  );
  document.addEventListener('DOMContentLoaded', () => onDocumentStateChange(DOCUMENT_STATE_DOM_LOADED), options);
  document.addEventListener('readystatechange', () => onDocumentStateChange(document.readyState), options);
  globalThis.addEventListener('load', () => onDocumentStateChange(DOCUMENT_STATE_FULLY_LOADED), options);
  isInitialized = true;
};

/**
 * Returns the current page lifecycle state.
 */
export const getPageLifecycleState = (): PageLifecycleState | null | undefined => currentPageLifecycleState;

/**
 * Returns the current document state.
 */
export const getDocumentState = (): DocumentState | null | undefined => currentDocumentState;

/**
 * Returns the event emitter instance.
 */
export const getPageLifecycleEventEmitter = (): EventEmitter => {
  if (!isInitialized) {
    initPageLifecycle();
  }
  return eventEmitter;
};

/**
 * Returns the page lifecycle observer initialized state.
 */
export const isPageLifecycleInitialized = (): boolean => isInitialized;

/**
 * Add callback for a specific state change.
 */
export const addPageLifecycleCallback = (state: DocumentState | PageLifecycleState, callback: () => void): void => {
  const stateCallbacks = callbacks[state] ?? [];
  stateCallbacks.push(callback);
  callbacks[state] = stateCallbacks;
};
