import react from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  root: './src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@/': `${join(__dirname, 'src')}/`,
    },
  },
  plugins: [react()],
});
