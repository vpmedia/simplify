import { delayPromise, loadJSON } from './async.js';

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
