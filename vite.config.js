import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// User site: https://aastha-mittal.github.io/ — assets live at repo root.
// If you deploy as a project page instead, set base to '/your-repo-name/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    chunkSizeWarningLimit: 2000,
  },
})
