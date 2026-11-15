<template>
  <ion-page>
    <!-- Bagian atas halaman berisi judul aplikasi dan tombol Refresh. -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Crypto Tugas 3</ion-title>
        <ion-buttons slot="end">
          <!-- Klik memanggil fetchData. Tombol tidak aktif selama data dimuat. -->
          <ion-button class="refresh-button" :disabled="isLoading" @click="fetchData">
            Refresh
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main class="mobile-container">
        <!-- v-if menampilkan pesan hanya saat kondisinya terpenuhi. -->
        <p v-if="isLoading" class="status" role="status">Sedang mengambil data...</p>
        <p v-if="errorMessage" class="error-box" role="alert">{{ errorMessage }}</p>
        <!-- Pesan ini muncul jika pemuatan berhasil tetapi daftar masih kosong. -->
        <p v-if="!isLoading && !errorMessage && coins.length === 0" class="status">
          Belum ada data cryptocurrency.
        </p>

        <!-- Daftar muncul jika ada data. v-for membuat satu kartu untuk tiap koin. -->
        <ul v-if="coins.length > 0" class="crypto-list" aria-label="Daftar cryptocurrency" :aria-busy="isLoading">
          <!-- key memakai id unik agar Vue mengenali tiap koin saat data berubah. -->
          <li v-for="coin in coins" :key="coin.id" class="crypto-card">
            <!-- Kolom kiri menampilkan peringkat koin. -->
            <div>
              <span class="field-label">Rank</span>
              <span class="field-rank">{{ coin.rank }}</span>
            </div>
            <!-- Kolom tengah menampilkan nama lengkap dan singkatan koin. -->
            <div>
              <span class="field-name">{{ coin.name }}</span>
              <span class="field-symbol">{{ coin.symbol }}</span>
            </div>
            <!-- Kolom kanan menampilkan harga dalam dolar AS. -->
            <div class="col-price">
              <span class="field-label">USD</span>
              <span class="field-price">{{ coin.price_usd }}</span>
            </div>
          </li>
        </ul>

        <!-- length menghitung jumlah koin yang sudah dimuat. -->
        <p v-if="coins.length > 0" class="status">{{ coins.length }} cryptocurrency dari CoinLore</p>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// ref membuat data reaktif, onMounted menjalankan fungsi setelah halaman terpasang.
import { ref, onMounted } from 'vue';
// Komponen Ionic yang dipakai untuk menyusun tampilan halaman.
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/vue';
// Bentuk data koin dan fungsi pengambil data berasal dari file terpisah.
import type { CryptoCoin } from '../types/crypto';
import { getCryptoTickers } from '../services/cryptoService';

const coins = ref<CryptoCoin[]>([]); // Daftar koin, awalnya kosong.
const isLoading = ref(false); // Menandai apakah pengambilan data sedang berjalan.
const errorMessage = ref(''); // Menyimpan pesan jika pengambilan data gagal.

// Dipakai ketika halaman dibuka dan ketika tombol Refresh ditekan.
async function fetchData() {
  // .value dipakai untuk membaca atau mengubah ref di dalam script.
  // Mulai loading dan hapus pesan kesalahan dari percobaan sebelumnya.
  isLoading.value = true;
  errorMessage.value = '';

  try {
    // Tunggu hasil API, lalu perbarui daftar agar tampilan ikut berubah.
    coins.value = await getCryptoTickers();
  } catch {
    // Jika gagal, tampilkan petunjuk untuk mencoba lagi.
    errorMessage.value = 'Gagal mengambil data. Periksa internet, lalu tekan Refresh.';
    // Data yang sebelumnya berhasil dimuat tetap disimpan dan ditampilkan.
    if (coins.value.length > 0) {
      errorMessage.value += ' Data terakhir masih ditampilkan.';
    }
  } finally {
    // Loading selalu dihentikan, baik permintaan berhasil maupun gagal.
    isLoading.value = false;
  }
}

// Ambil data otomatis ketika halaman pertama kali terpasang.
onMounted(fetchData);
</script>

<style scoped>
/* scoped membatasi gaya pada komponen ini. Isi dibatasi lebarnya dan ditaruh di tengah. */
.mobile-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 16px 16px max(24px, env(safe-area-inset-bottom));
}

/* Tombol Refresh memakai latar biru dan teks putih. */
.refresh-button {
  --background: #0d6efd;
  --color: #ffffff;
  --border-radius: 5px;
  margin-right: 8px;
  padding: 0 4px;
  text-transform: none;
}

/* Hilangkan tanda poin bawaan daftar dan beri jarak antarkartu. */
.crypto-list {
  display: grid;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
}

/* Satu kartu dibagi menjadi tiga kolom: peringkat, nama dan simbol, lalu harga. */
.crypto-card {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 12px;
  padding: 12px;
  border: 1px solid #ebdcb2;
  border-radius: 8px;
  background: #fef9e7;
}

/* Label dan nama koin ditulis lebih kecil di baris tersendiri. */
.field-label,
.field-name {
  display: block;
  margin-bottom: 4px;
  color: #675f47;
  font-size: 11px;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

/* Peringkat, simbol, dan harga ditulis lebih besar agar mudah dibaca. */
.field-rank,
.field-symbol,
.field-price {
  display: block;
  font-size: 18px;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

/* Simbol koin dibuat lebih tebal. */
.field-symbol {
  font-weight: 600;
}

/* Harga rata kanan. Lebar digit disamakan jika didukung oleh font. */
.col-price {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

/* Gaya pesan loading, data kosong, dan jumlah koin. */
.status {
  color: #657080;
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
}

/* Pesan kesalahan memakai latar merah muda dan teks merah. */
.error-box {
  padding: 12px;
  border-radius: 5px;
  background: #fff0ef;
  color: #a1261c;
  font-size: 13px;
  line-height: 1.6;
}

/* Perkecil kolom, jarak, dan teks agar kartu tetap muat pada layar HP kecil. */
@media (max-width: 360px) {
  .crypto-card {
    grid-template-columns: 32px minmax(0, 1fr) minmax(0, 1.15fr);
    gap: 8px;
    padding: 10px;
  }

  .field-rank,
  .field-symbol,
  .field-price {
    font-size: 16px;
  }
}
</style>
