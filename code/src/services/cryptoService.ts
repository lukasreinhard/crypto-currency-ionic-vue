// Axios digunakan untuk mengirim permintaan data ke API.
import axios from 'axios';
// Tipe data ini membantu TypeScript memeriksa bentuk data yang dipakai.
import type { CryptoCoin, CoinloreResponse } from '../types/crypto';

// Alamat API yang menyediakan daftar cryptocurrency.
const API_URL = 'https://api.coinlore.net/api/tickers/';

// Fungsi async mengambil data dari internet dan mengembalikan daftar koin.
export async function getCryptoTickers(): Promise<CryptoCoin[]> {
  // Tunggu respons API dengan batas waktu 15 detik (15000 milidetik).
  const response = await axios.get<CoinloreResponse>(API_URL, { timeout: 15000 });

  // Pastikan daftar koin berupa array. Kesalahan ditangani di HomePage.vue.
  if (!Array.isArray(response.data.data)) {
    throw new Error('Format data API tidak sesuai.');
  }

  // data pertama adalah isi respons Axios, data kedua adalah daftar koin.
  return response.data.data;
}
