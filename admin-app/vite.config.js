import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This must match the folder name in your GitHub Pages URL
  base: '/Fix-it/admin-app/', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    // Helpful for development in Codespaces
    historyApiFallback: true,
  }
})
