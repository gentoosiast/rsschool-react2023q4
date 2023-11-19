import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
  },
  css: {
    transformer: 'lightningcss',
  },
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      all: true,
      exclude: ['src/tests/**/*', '**/types.ts', '**/*.d.ts', '**/index.ts', 'src/main.tsx'],
      include: ['src/**/*'],
      provider: 'v8',
      reporter: ['text'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setupTests.ts'],
  },
});
