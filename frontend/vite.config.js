import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from 'vue-router/vite';

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