export class TypeCheckError extends TypeError {
  /**
   * Creates a new `TypeCheckError` instance.
   * @param {string} message - Error message.
   * @param {{ cause?: unknown, value?: unknown }} [options] - Error options.
   */
  constructor(message, options) {
    super(message, options);
    this.name = 'TypeCheckError';
    this.value = options?.value;
  }
}
