import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Samajh',
        short_name: 'Samajh',
        description: 'Understand any government document, offline',
        theme_color: '#2563EB',
        background_color: '#FAFAFA',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /tessdata\.projectnaptha\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'tesseract-lang-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['tesseract.js', '@mlc-ai/web-llm']
  },
  worker: { format: 'es' }
})
