export interface TypeCheckErrorOptions extends ErrorOptions {
  value?: unknown;
}

export class TypeCheckError extends TypeError {
  value: unknown;

  /**
   * Creates a new `TypeCheckError` instance.
   */
  constructor(message: string, options?: TypeCheckErrorOptions) {
    super(message, options);
    this.name = 'TypeCheckError';
    this.value = options?.value;
  }
}
