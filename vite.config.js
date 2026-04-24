import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Estratègia de cache: els fitxers de l'app s'actualitzen automàticament
      // Els JSON de contingut es serveixen des de cache si hi ha xarxa (stale-while-revalidate)
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            // Cache dels mòduls JSON de contingut
            urlPattern: /\/data\/modules\/.*\.json$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'modules-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 }
            }
          }
        ]
      },
      manifest: {
        name: "Acadèmia Còsmica",
        short_name: "Còsmica",
        description: "Aprèn astronomia com un científic",
        theme_color: "#0b0f1e",
        background_color: "#0b0f1e",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ]
})
