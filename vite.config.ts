// Vite menjalankan server pengembangan dan membangun aplikasi web.
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // Plugin ini membuat Vite dapat membaca file komponen .vue.
  plugins: [vue()],
  // Buka akses jaringan lokal di port 8100. Berhenti jika port sudah dipakai.
  server: { host: '0.0.0.0', port: 8100, strictPort: true },
});
