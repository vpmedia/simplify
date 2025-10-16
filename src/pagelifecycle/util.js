/**
 * Page lifecycle helper.
 * @see https://developer.chrome.com/docs/web-platform/page-lifecycle-api
 */

import { EventEmitter } from 'eventemitter3';
import { Logger } from '../logging/Logger.js';
import {
  DOCUMENT_STATE_DOM_LOADED,
  DOCUMENT_STATE_FULLY_LOADED,
  PAGE_LIFECYCLE_STATE_ACTIVE,
  PAGE_LIFECYCLE_STATE_FROZEN,
  PAGE_LIFECYCLE_STATE_HIDDEN,
  PAGE_LIFECYCLE_STATE_PASSIVE,
  PAGE_LIFECYCLE_STATE_TERMINATED,
} from './const.js';
import { DOCUMENT_STATE_CHANGE_EVENT, PAGE_LIFECYCLE_STATE_CHANGE_EVENT } from './event.js';

const logger = new Logger('pagelifecycle');

const eventEmitter = new EventEmitter();

/** @type {import('./typedef.js').PageLifecycleState} */
let currentPageLifecycleState = null;

/** @type {import('./typedef.js').DocumentState} */
let currentDocumentState = null;

let isInitialized = false;

/** @type {{[key: string]: (() => void)[]}} */
let callbacks = {};

/**
 * Add callback for a specific state change.
 * @param {import('./typedef.js').DocumentState | import('./typedef.js').PageLifecycleState} state - Callback state condition.
 * @param {() => void} callback - Callback function.
 */
export const addPageLifecycleCallback = (state, callback) => {
  const stateCallbacks = callbacks[state] ?? [];
  stateCallbacks.push(callback);
  callbacks[state] = stateCallbacks;
};

/**
 * Run callbacks for a specific state change.
 * @param {import('./typedef.js').DocumentState | import('./typedef.js').PageLifecycleState} state - Callback state condition.
 */
const processCallbacks = (state) => {
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
 * @returns {import('./typedef.js').PageLifecycleState} Current page lifecycle state.
 */
const detectPageLifecycleState = () => {
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
 * @param {import('./typedef.js').PageLifecycleState} nextState - Next page lifecycle state.
 */
const onPageLifecycleStateChange = (nextState) => {
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
 * @param {import('./typedef.js').DocumentState} nextState - Next document state.
 */
const onDocumentStateChange = (nextState) => {
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
export const initPageLifecycle = () => {
  if (isInitialized) {
    return;
  }
  logger.info('initPageLifecycle');
  onPageLifecycleStateChange(detectPageLifecycleState());
  onDocumentStateChange(document.readyState);
  const options = { capture: true };
  document.addEventListener('visibilitychange', () => onPageLifecycleStateChange(detectPageLifecycleState()), options);
  // window.addEventListener('popstate', () => onPageLifecycleStateChange(detectPageLifecycleState()), options);
  window.addEventListener('pageshow', () => onPageLifecycleStateChange(detectPageLifecycleState()), options);
  window.addEventListener('focus', () => onPageLifecycleStateChange(detectPageLifecycleState()), options);
  window.addEventListener('blur', () => onPageLifecycleStateChange(detectPageLifecycleState()), options);
  document.addEventListener('resume', () => onPageLifecycleStateChange(detectPageLifecycleState()), options);
  document.addEventListener('freeze', () => onPageLifecycleStateChange(PAGE_LIFECYCLE_STATE_FROZEN), options);
  window.addEventListener(
    'pagehide',
    (event) =>
      onPageLifecycleStateChange(event.persisted ? PAGE_LIFECYCLE_STATE_FROZEN : PAGE_LIFECYCLE_STATE_TERMINATED),
    options
  );
  document.addEventListener('DOMContentLoaded', () => onDocumentStateChange(DOCUMENT_STATE_DOM_LOADED), options);
  document.addEventListener('readystatechange', () => onDocumentStateChange(document.readyState), options);
  window.addEventListener('load', () => onDocumentStateChange(DOCUMENT_STATE_FULLY_LOADED), options);
  isInitialized = true;
};

/**
 * Returns the current page lifecycle state.
 * @returns {string} Current page lifecycle state.
 */
export const getPageLifecycleState = () => {
  return currentPageLifecycleState;
};

/**
 * Returns the current document state.
 * @returns {import('./typedef.js').DocumentState} Current document state.
 */
export const getDocumentState = () => {
  return currentDocumentState;
};

/**
 * Returns the event emitter instance.
 * @returns {EventEmitter} Event emitter instance.
 */
export const getPageLifecycleEventEmitter = () => {
  if (!isInitialized) {
    initPageLifecycle();
  }
  return eventEmitter;
};

/**
 * Returns the page lifecycle observer initialized state.
 * @returns {boolean} Page lifecycle observer initialized flag.
 */
export const isPageLifecycleInitialized = () => {
  return isInitialized;
};
