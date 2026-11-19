import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin to duplicate index.html to privacy/index.html so Vercel can serve /privacy statically
function spaFallbackPlugin() {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const privacyDir = path.resolve(distDir, 'privacy')
      const indexFile = path.resolve(distDir, 'index.html')
      if (fs.existsSync(indexFile)) {
        if (!fs.existsSync(privacyDir)) {
          fs.mkdirSync(privacyDir, { recursive: true })
        }
        fs.copyFileSync(indexFile, path.resolve(privacyDir, 'index.html'))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    spaFallbackPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
