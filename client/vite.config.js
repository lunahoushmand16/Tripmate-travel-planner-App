
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173 // ✅ Use 5173 to avoid conflict with backend
  }
});
