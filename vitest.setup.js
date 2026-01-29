import { setupServer } from 'msw/node';
import { beforeAll } from 'vitest';
import { handlers } from './tests/mocks/handlers.js';

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
