import {
  HTTP_401_UNAUTHORIZED,
  HTTP_403_FORBIDDEN,
  HTTP_405_METHOD_NOT_ALLOWED,
  HTTP_422_UNPROCESSABLE_CONTENT,
} from '../const/http_status.js';
import { Logger } from '../logging/Logger.js';
import { delayPromise } from './async.js';
import { getErrorDetails } from './error.js';

const logger = new Logger('fetch');

export const HTTP_0_ANY = 0;

export interface FetchRetryOptions {
  delay?: number;
  numTries?: number;
  statusExcludes?: number[];
  timeout?: number;
}

export class FetchError extends Error {
  resource: string | URL | Request;
  fetchOptions: RequestInit;
  response: Response | null;
  override cause: number | null;

  /**
   * Creates a new FetchError instance.
   */
  constructor(message: string, resource: string | URL | Request, fetchOptions: RequestInit, response: Response | null) {
    super(message);
    this.name = 'FetchError';
    this.resource = resource;
    this.fetchOptions = fetchOptions;
    this.response = response;
    this.cause = response?.status ?? null;
  }
}

/**
 * Fetch with retry.
 */
export const fetchRetry = async (
  resource: string | URL | Request,
  fetchOptions: RequestInit,
  retryOptions?: FetchRetryOptions
): Promise<Response> => {
  const opts: Required<FetchRetryOptions> = {
    timeout: Math.max(retryOptions?.timeout ?? 30_000, 1),
    delay: Math.max(retryOptions?.delay ?? 1000, 1),
    numTries: Math.max(retryOptions?.numTries ?? 1, 1),
    statusExcludes: retryOptions?.statusExcludes ?? [
      HTTP_401_UNAUTHORIZED,
      HTTP_403_FORBIDDEN,
      HTTP_405_METHOD_NOT_ALLOWED,
      HTTP_422_UNPROCESSABLE_CONTENT,
    ],
  };
  while (opts.numTries > 0) {
    const isOnline = globalThis.navigator?.onLine;
    logger.info('request', { resource: String(resource), fetchOptions, retryOptions: { ...opts }, isOnline });
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(new DOMException('Fetch timed out', 'AbortError')),
      opts.timeout
    );
    const options: RequestInit = {
      ...fetchOptions,
      signal: controller.signal,
    };
    try {
      const response = await fetch(resource, options);
      if (!response.ok) {
        throw new FetchError(`Fetch error ${response.status}`, resource, options, response);
      }
      logger.info('response', { status: response.status });
      return response;
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      logger.debug('error', getErrorDetails(typedError));
      opts.numTries -= 1;
      if (
        opts.numTries === 0 ||
        (typedError instanceof FetchError &&
          (opts.statusExcludes.includes(typedError.response?.status ?? -1) ||
            opts.statusExcludes.includes(HTTP_0_ANY)))
      ) {
        throw error;
      }
      await delayPromise(opts.delay);
      opts.delay *= 2;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw new Error('Fetch failed');
};
