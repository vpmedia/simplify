import { delayPromise, loadJSON, retryAsync } from './async.js';

describe('delayPromise', () => {
  test('Returns a promise that resolves after specified delay', async () => {
    const start = Date.now();
    await delayPromise(10);
    const end = Date.now();

    // Should resolve within a reasonable time frame
    expect(end - start).toBeGreaterThanOrEqual(9);
  });

  test('delayPromise with zero delay', async () => {
    const start = Date.now();
    await delayPromise(0);
    const end = Date.now();

    // Should resolve immediately
    expect(end - start).toBeGreaterThanOrEqual(0);
  });
});

describe('loadJSON', () => {
  test('Load JSON data', async () => {
    const data = await loadJSON('/test.json');
    expect(data).toMatchObject({
      method: 'GET',
      success: true,
    });
  });
});

describe('retryAsync', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns result when method succeeds immediately', async () => {
    const method = vi.fn().mockResolvedValue('success');
    const result = await retryAsync(method, 1, 100);
    expect(result).toBe('success');
    expect(method).toHaveBeenCalledTimes(1);
  });

  it('retries once and then succeeds', async () => {
    const method = vi.fn().mockRejectedValueOnce(new Error('fail')).mockResolvedValueOnce('success');
    const promise = retryAsync(method, 1, 100);
    await vi.advanceTimersByTimeAsync(100);
    const result = await promise;
    expect(result).toBe('success');
    expect(method).toHaveBeenCalledTimes(2);
  });

  it('throws after exceeding retries', async () => {
    const method = vi.fn().mockRejectedValue(new Error('fail'));
    const promise = retryAsync(method, 1, 0);
    // await vi.advanceTimersByTimeAsync(0);
    await expect(promise).rejects.toThrow('fail');
    expect(method).toHaveBeenCalledTimes(2);
  });

  it('does not retry when numTries is 0', async () => {
    const method = vi.fn().mockRejectedValue(new Error('fail'));
    await expect(retryAsync(method, 0, 100)).rejects.toThrow('fail');
    expect(method).toHaveBeenCalledTimes(1);
  });

  it('does not wait when delayMs is 0', async () => {
    const method = vi.fn().mockRejectedValueOnce(new Error('fail')).mockResolvedValueOnce('success');
    const result = await retryAsync(method, 1, 0);
    expect(result).toBe('success');
    expect(method).toHaveBeenCalledTimes(2);
  });
});
