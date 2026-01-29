import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['./src/**/*.test.{js,jsx,ts,tsx}'],
    isolate: false,
    pool: 'threads',
    setupFiles: ['./vitest.setup.js'],
    watch: false,
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      provider: 'v8',
      reporter: ['text'],
    },
  },
});
