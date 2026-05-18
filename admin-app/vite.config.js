import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const isGitHub = process.env.DEPLOY_ENV === 'ghpages'

  return {
    plugins: [react()],
    base: isGitHub ? '/Fix-it/admin-app/' : '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    }
  }
})
