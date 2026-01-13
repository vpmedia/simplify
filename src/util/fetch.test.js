import { HTTP_404_NOT_FOUND } from '../const/http_status.js';
import { fetchRetry, FetchError } from './fetch.js';

describe('fetchRetry', () => {
  test('fetch OK', async () => {
    const response = await fetchRetry('https://jsonplaceholder.typicode.com/todos/1', {
      cache: 'no-cache',
      keepalive: false,
      method: 'GET',
      redirect: 'error',
    });
    const json = await response.json();
    const expectedJSON = {
      completed: false,
      id: 1,
      title: 'delectus aut autem',
      userId: 1,
    };
    expect(json).toEqual(expectedJSON);
  });
  test('fetch unknown scheme', async () => {
    try {
      await fetchRetry('htps://jsonplaceholder', {});
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
        'https://jsonplaceholder.typicode.com/todos/1',
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
