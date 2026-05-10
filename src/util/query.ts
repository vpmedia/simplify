const urlSearchParams = new URLSearchParams(globalThis.location?.search);

/**
 * Sanitizes URL parameters allowing only alpha-numeric characters and dash.
 */
export function sanitizeURLParam(input: string): string;
export function sanitizeURLParam(input: null | undefined): null | undefined;
export function sanitizeURLParam(input: string | null | undefined): string | null | undefined;
export function sanitizeURLParam(input: string | null | undefined): string | null | undefined {
  if (!input) {
    return input;
  }
  return input.replaceAll(/[^\w-]/giu, '');
}

/**
 * Get a URL parameter value.
 */
export function getURLParam<T = null>(
  key: string | null | undefined,
  defaultValue?: T,
  isSanitize?: boolean
): string | T {
  if (!key) {
    return (defaultValue ?? null) as T;
  }
  const paramValue = urlSearchParams.get(key);
  if (paramValue === null || paramValue === undefined) {
    return (defaultValue ?? null) as T;
  }
  if (isSanitize !== false) {
    return sanitizeURLParam(paramValue) as string;
  }
  return paramValue;
}
