import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    __MAVEN_DAPP_VERCEL_ENV__: process.env.MAVEN_DAPP_VERCEL_ENV,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    // include: ['./node_modules/maven-ui/src/components'],
  },
  esbuild: {
    // jsxInject: `import React from 'react'`,
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
}));
