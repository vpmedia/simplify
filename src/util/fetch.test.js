import { HTTP_404_NOT_FOUND } from '../const/http_status.js';
import { fetchRetry, FetchError } from './fetch.js';

describe('fetchRetry', () => {
  test('core', () => {
    expect(fetchRetry).toBeDefined();
    expect(typeof fetchRetry).toBe('function');
    expect(FetchError).toBeDefined();
  });

  test('fetchError', async () => {
    try {
      const response = await fetchRetry('https://jsonplaceholder.typicode.com/todos/1', {
        cache: 'no-cache',
        keepalive: false,
        method: 'POST',
        redirect: 'error',
      });
      const json = await response.json();
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      expect(typedError).toBeInstanceOf(FetchError);
      if (typedError instanceof FetchError) {
        expect(typedError.message).toBe('fetch https://jsonplaceholder.typicode.com/todos/1 returned status 404');
        expect(typedError.response.status).toBe(HTTP_404_NOT_FOUND);
        expect(typedError.cause).toBe(HTTP_404_NOT_FOUND);
      }
    }
  });

  test('fetchGet', async () => {
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
});
