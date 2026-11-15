// Router menghubungkan alamat aplikasi dengan komponen halaman.
import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';

// Aplikasi ini hanya memiliki satu halaman.
export default createRouter({
  // Gunakan riwayat browser dengan alamat dasar yang diatur oleh Vite.
  history: createWebHistory(import.meta.env.BASE_URL),
  // Saat alamat utama / dibuka, tampilkan HomePage.
  routes: [{ path: '/', component: HomePage }],
});
