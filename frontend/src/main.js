import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './configs/routers'

// Mengimpor script pendaftaran PWA otomatis
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // Anda bisa memunculkan UI notifikasi jika ada pembaruan aplikasi baru
    console.log('Konten baru tersedia, silakan muat ulang halaman.')
  },
  onOfflineReady() {
    console.log('Aplikasi siap digunakan secara offline.')
  },
})

createApp(App)
  .use(router)
  .mount('#app')
