import { HTTP_100_CONTINUE, HTTP_STATUS_MAP } from './http_status.js';

describe('http_status', () => {
  test('HTTP status name from code', () => {
    expect(HTTP_STATUS_MAP[HTTP_100_CONTINUE]).toBe('HTTP_100_CONTINUE');
  });
});
