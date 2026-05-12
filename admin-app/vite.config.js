import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Fix-it/admin/', // This MUST match your repository name or subfolder
})
