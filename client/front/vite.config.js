// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/models': {
        target: 'http://localhost:4000', // Change to your backend server URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/models/, '/uploads/models'), // Rewrite rule for your backend endpoint
      },
    },
  },
});
