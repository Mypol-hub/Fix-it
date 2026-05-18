import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isGitHub = process.env.DEPLOY_ENV === 'ghpages'

  return {
    plugins: [react()],
    base: isGitHub ? '/Fix-it/' : '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    }
  }
})
