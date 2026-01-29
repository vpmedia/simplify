import { HTTP_404_NOT_FOUND } from '../const/http_status.js';
import { fetchRetry, FetchError } from './fetch.js';

describe('FetchError', () => {
  test('constructor', () => {
    const error = new FetchError('message', 'url', { method: 'GET' }, null);
    expect(error.message).toEqual('message');
    expect(error.resource).toEqual('url');
    expect(error.fetchOptions).toMatchObject({ method: 'GET' });
    expect(error.response).toBe(null);
  });
});

describe('fetchRetry', () => {
  test('fetch OK', async () => {
    const response = await fetchRetry('/test.json', {
      cache: 'no-cache',
      keepalive: false,
      method: 'GET',
      redirect: 'error',
    });
    const json = await response.json();
    const expectedJSON = {
      success: true,
      method: 'GET',
    };
    expect(json).toEqual(expectedJSON);
  });
  test('fetch unknown scheme', async () => {
    try {
      await fetchRetry('htps://', {});
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      expect(typedError.message).toEqual('fetch failed');
      const typedErrorCause =
        typedError.cause instanceof Error ? typedError.cause : new Error(String(typedError.cause));
      expect(typedErrorCause.message).toEqual('unknown scheme');
    }
  });
  test('fetch 404 error with retry', async () => {
    try {
      await fetchRetry(
        '/test_error.json',
        {
          cache: 'no-cache',
          keepalive: false,
          method: 'POST',
          redirect: 'error',
        },
        { numTries: 2, statusExcludes: [], delay: 1 }
      );
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      expect(typedError).toBeInstanceOf(FetchError);
      if (typedError instanceof FetchError) {
        expect(typedError.message).toBe('Fetch error 404');
        expect(typedError.response.status).toBe(HTTP_404_NOT_FOUND);
        expect(typedError.cause).toBe(HTTP_404_NOT_FOUND);
      }
    }
  });
});
