// Tipe ini membantu TypeScript memeriksa pengaturan Capacitor.
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Identitas paket yang membedakan aplikasi ini dari aplikasi Android lain.
  appId: 'id.ac.ut.cryptotugas3',
  // Nama aplikasi yang terlihat di HP.
  appName: 'Crypto Tugas 3',
  // Folder hasil build web yang disalin ke proyek Android.
  webDir: 'dist',
  // Gunakan skema HTTPS untuk alamat lokal aplikasi di WebView Android.
  server: { androidScheme: 'https' },
};

// Sediakan pengaturan ini untuk perintah Capacitor.
export default config;
