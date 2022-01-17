import react from '@vitejs/plugin-react';
import { join } from 'path';
import { inspectorServer } from 'react-dev-inspector/plugins/vite';
import { defineConfig } from 'vite';

// react-dev-inspector用
process.env.REACT_EDITOR = 'code';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  root: './src',
  base: './',
  envDir: '../env',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@/': `${join(__dirname, 'src')}/`,
    },
  },
  plugins: [react(), inspectorServer()],
});
