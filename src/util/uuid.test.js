import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { randomUUIDFallback, uuidv4 } from './uuid.js';

const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

describe('UUID functions', () => {
  let originalRandomUUID = null;

  beforeEach(() => {
    originalRandomUUID = crypto.randomUUID;
  });

  afterEach(() => {
    crypto.randomUUID = originalRandomUUID;
  });

  it('randomUUIDFallback generates a valid UUID v4', () => {
    const uuid = randomUUIDFallback();
    expect(uuid).toMatch(uuidV4Regex);
  });

  it('uuidv4 returns a valid UUID v4', () => {
    const uuid = uuidv4();
    expect(uuid).toMatch(uuidV4Regex);
  });

  it('uuidv4 uses crypto.randomUUID if available', () => {
    // @ts-expect-error
    crypto.randomUUID = vi.fn(() => 'mock-uuid');
    const uuid = uuidv4();
    expect(uuid).toBe('mock-uuid');
    expect(crypto.randomUUID).toHaveBeenCalled();
  });

  it('randomUUIDFallback fallback works if crypto.randomUUID not available', () => {
    delete crypto.randomUUID;
    const uuid = randomUUIDFallback();
    expect(uuid).toMatch(uuidV4Regex);
  });
});
