import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from 'vue-router/vite';
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    VueRouter({ 
      routesFolder: [
        {
          src: 'src/pages/public',
          path: '',
        },
        {
          src: 'src/pages',
        }
      ],
      exclude: ['src/pages/components/**']
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Aplikasi Azure Haven',
        short_name: 'AzureHaven',
        description: 'Aplikasi Vue PWA dengan Daisy UI',
        theme_color: '#0A2540', // Menggunakan warna Primary Navy dari design system Anda
        background_color: '#F8FAFC',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Pengaturan strategi cache agar file aset, halaman, dan script bisa diakses secara offline
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            // Cache untuk halaman atau aset eksternal jika diperlukan
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 tahun
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
  ],
  
  server: {
    // make alias for api_server
    proxy: {
      '/api': {
        target: 'https://api.asaromi.workers.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    },
  }
});