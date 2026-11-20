import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin to duplicate index.html to route directories so Vercel serves all sitemap routes statically
function spaFallbackPlugin() {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const indexFile = path.resolve(distDir, 'index.html')
      if (fs.existsSync(indexFile)) {
        const routes = ['privacy', 'about', 'poojas', 'poornaphala']
        for (const route of routes) {
          const routeDir = path.resolve(distDir, route)
          if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true })
          }
          fs.copyFileSync(indexFile, path.resolve(routeDir, 'index.html'))
        }
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
