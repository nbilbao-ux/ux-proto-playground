import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// For GitHub Pages: 
// - User/org page (nbilbao-ux.github.io): use '/'
// - Project page (nbilbao-ux.github.io/ux-proto-playground): use '/ux-proto-playground/'
// Default to '/' for now - adjust if your site is in a subdirectory
const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  plugins: [react()],
  base,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and React DOM into separate chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Split UI library into separate chunk
          'ui-vendor': ['@ffa/latitude-typescript'],
          // Split styled-components into separate chunk
          'styled-vendor': ['styled-components'],
        },
      },
    },
  },
});

