const DEFAULT_EXCLUDES = new Set(['stack']);

export interface ErrorDetails {
  name: string;
  type: string;
  message?: string;
  cause?: unknown;
  [key: string]: unknown;
}

/**
 * Retrieves detailed information from an error object.
 */
export const getErrorDetails = (error: Error, excludes?: string[] | null): ErrorDetails => {
  const errorDetails: ErrorDetails = {
    name: error.name,
    type: error.constructor?.name ?? typeof error,
  };
  if (error.message) {
    errorDetails.message = error.message;
  }
  if (error.cause) {
    errorDetails.cause = error.cause;
  }
  for (const key of Object.getOwnPropertyNames(error)) {
    if (!excludes?.includes(key) && !DEFAULT_EXCLUDES.has(key)) {
      errorDetails[key] = (error as unknown as Record<string, unknown>)[key];
    }
  }
  return errorDetails;
};

/**
 * Get typed error from an unknown type.
 */
export const getTypedError = (error: unknown): Error =>
  error instanceof Error ? error : new Error(String(error));
