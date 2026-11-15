# Crypto Tugas 3

Adaptasi sederhana dari repo **oci-cmd**:

https://github.com/oci-cmd/CryptoIonicVue3TypeScriptViteTugas3UT

Proyek mempertahankan **Ionic Vue, TypeScript, Axios, router, dan Capacitor 6** dari repo sumber.

## Menjalankan aplikasi

Buka folder utama repositori di VS Code, yaitu folder yang berisi `package.json`, lalu jalankan:

```powershell
npm install
npm run dev
```

Buka **http://localhost:8100**. Aplikasi mengambil data asli dari CoinLore, menampilkan `rank`, `name`, `symbol`, dan `price_usd`, serta menyediakan tombol Refresh. Internet diperlukan untuk mengambil data.

## Tiga file utama untuk dijelaskan

### src/types/crypto.ts

`CryptoCoin` mendefinisikan bentuk satu koin: `id`, `rank`, `name`, `symbol`, dan `price_usd`. `id` menjadi penanda unik pada `v-for`; empat field lainnya ditampilkan di layar. `CoinloreResponse` menjelaskan bahwa respons API berisi array koin pada properti `data`.

### src/services/cryptoService.ts

`getCryptoTickers()` mengambil data menggunakan Axios dengan batas waktu 15 detik. Axios menyediakan JSON pada `response.data`. Daftar koin berada pada properti `data` di dalamnya, sehingga fungsi mengembalikan `response.data.data`. Jika format tidak sesuai atau permintaan gagal, kesalahan diteruskan ke halaman utama.

### src/views/HomePage.vue

File ini berisi tiga bagian: `<template>` untuk tampilan, `<script setup lang="ts">` untuk logika, dan `<style scoped>` untuk CSS halaman.

| Variabel | Fungsi |
| --- | --- |
| `coins` | Menyimpan daftar koin dari API. |
| `isLoading` | Menandai pengambilan data dan menonaktifkan Refresh sementara. |
| `errorMessage` | Menyimpan pesan kegagalan. |

`fetchData()` memanggil `getCryptoTickers()` dan menyimpan hasilnya pada `coins.value`. `catch` menampilkan pesan jika gagal, sedangkan `finally` mengakhiri status loading. `onMounted(fetchData)` memanggil fungsi tersebut saat halaman dibuka. `v-for` menampilkan tiap koin dalam tiga kolom.

Alurnya: **buka halaman / Refresh -> fetchData -> getCryptoTickers -> API CoinLore -> coins -> v-for**.

Pencarian, pull-to-refresh, badge perubahan harga, dan data contoh offline dihapus agar kode lebih singkat. Jika API gagal setelah data pernah dimuat, daftar terakhir tetap tampil disertai pemberitahuan. Jika respons kosong, aplikasi menampilkan pesan data kosong.

## File pendukung

| File | Fungsi |
| --- | --- |
| `src/main.ts` | Memulai Vue, mengaktifkan Ionic dan router, serta memuat CSS. |
| `src/App.vue` | Menyediakan `IonApp` dan tempat halaman ditampilkan. |
| `src/router/index.ts` | Mengarahkan alamat `/` ke halaman utama. |
| `src/theme/variables.css` | Mengatur warna dan font dasar. |
| `capacitor.config.ts` | Mengatur ID aplikasi, nama, dan folder build `dist`. |
| `vite.config.ts` | Mengaktifkan Vue dan server pada port 8100. |
| `package.json` | Menyimpan dependensi dan perintah proyek. |
| `android/` | Proyek Android dari repo sumber, dengan penyesuaian identitas aplikasi. |
| `scripts/` | Perintah bantu Windows untuk menyiapkan SDK dan membuat APK. |

## Pemeriksaan dan build

```powershell
npm run build
```

Build menjalankan pemeriksaan TypeScript sebelum menghasilkan folder `dist`.

## Membuat APK tanpa Android Studio

Gunakan **JDK 17, SDK Platform Android 34, dan Build Tools 34.0.0**, sesuai Capacitor 6 dari repo sumber. JDK 17 sudah tersedia pada komputer ini; skrip build hanya mengatur Java pada proses build.

Jika SDK 34 belum tersedia, jalankan sekali:

```powershell
powershell -NoProfile -File scripts/prepare-android.ps1
```

Untuk menghasilkan APK:

```powershell
npm run apk:build
```

Skrip menjalankan build web, `cap sync android`, dan `gradlew.bat assembleDebug`. Hasil APK berada di `output/crypto-tugas-3.apk`. APK debug ini digunakan untuk praktikum.

Salin APK ke HP dan pasang mengikuti petunjuk Android, atau aktifkan USB debugging dan jalankan:

```powershell
adb devices
adb install -r output/crypto-tugas-3.apk
```

Nama aplikasinya **Crypto Tugas 3**. Harga mengikuti respons API dan dapat berbeda dari gambar soal.

## Urutan penjelasan video

1. Jelaskan tujuan dan sebutkan repo sumber.
2. Tunjukkan `crypto.ts` dan empat atribut yang diminta.
3. Jelaskan Axios pada `cryptoService.ts`.
4. Jelaskan tiga variabel reaktif, `fetchData()`, dan `onMounted()` pada `HomePage.vue`.
5. Tunjukkan `v-for`, tombol Refresh, dan CSS Grid tiga kolom.
6. Demonstrasikan aplikasi di HP setelah APK dipasang.
7. Tunjukkan hasil APK dan jelaskan peran Capacitor serta Gradle.

## Hasil pemeriksaan

Pemeriksaan TypeScript, build web, build APK, dan delapan skenario browser telah lulus. Tanda tangan APK valid dan seluruh aset web yang dikemas cocok dengan hasil build yang diuji.

Hasil pemeriksaan adaptasi disimpan di `output/hasil-verifikasi-web.json`, `output/hasil-verifikasi-apk.json`, dan `output/tampilan-mobile.png`. APK belum diuji langsung pada HP fisik.
