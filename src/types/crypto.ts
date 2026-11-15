// Bentuk data satu cryptocurrency dari API CoinLore.
export interface CryptoCoin {
  id: string; // Kode unik koin, dipakai sebagai key pada daftar.
  rank: number; // Peringkat koin, misalnya 1 untuk Bitcoin.
  name: string; // Nama lengkap koin, misalnya Bitcoin.
  symbol: string; // Singkatan nama koin, misalnya BTC.
  price_usd: string; // Harga dalam dolar AS, berupa teks sesuai respons API.
}

// Daftar cryptocurrency berada pada properti data dalam respons API.
export interface CoinloreResponse {
  data: CryptoCoin[]; // Tanda [] berarti daftar yang berisi banyak koin.
}
