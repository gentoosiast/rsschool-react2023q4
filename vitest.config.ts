import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      all: true,
      exclude: ['src/tests/**/*', '**/types.ts', '**/*.d.ts', '**/index.ts'],
      include: ['src/**/*'],
      provider: 'v8',
      reporter: ['text'],
    },
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts'],
  },
});
