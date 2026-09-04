import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import postcssGlobalData from '@csstools/postcss-global-data';
import postcssCustomMedia from 'postcss-custom-media';

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss: {
      // Resolves the @custom-media names defined in src/styles/breakpoints.css.
      // Global data has to run first: it makes those definitions visible to
      // every stylesheet without emitting anything, since each component CSS
      // file is processed on its own and would otherwise not see them.
      plugins: [
        postcssGlobalData({ files: [path.resolve(__dirname, 'src/styles/breakpoints.css')] }),
        postcssCustomMedia(),
      ],
    },
  },
  server: {
    port: 2223,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
