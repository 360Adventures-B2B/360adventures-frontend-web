interface CurrencyRates {
  [key: string]: number;
}

// Default rates: Anggap USD = 1, kurs lainnya adalah nilai relatif terhadap USD
const defaultCurrencyRates: CurrencyRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110.0,
  IDR: 15000,
  AUD: 1.35,
};

// Simbol mata uang
const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  IDR: "Rp",
  AUD: "A$",
};

export const getCurrencyRatesFromLocalStorage = (): CurrencyRates => {
  if (typeof window === "undefined") {
    return defaultCurrencyRates;
  }

  const rates = localStorage.getItem("currencyRates");
  return rates ? JSON.parse(rates) : defaultCurrencyRates;
};

// Fungsi untuk mengambil simbol mata uang
export const getCurrencySymbol = (currency: string): string => {
  return currencySymbols[currency] || ""; // Mengembalikan simbol mata uang atau kosong jika tidak ada
};

// Fungsi untuk memformat harga sesuai dengan mata uang yang ada di localStorage
export const formatNumber = (priceInUSD: number): string => {
  const rates = getCurrencyRatesFromLocalStorage();
  const selectedCurrency = "USD"; // Pilih default mata uang misalnya 'IDR' (atau ambil dari localStorage juga)

  const rate = rates[selectedCurrency];
  const symbol = getCurrencySymbol(selectedCurrency);

  if (rate) {
    const priceInCurrency = priceInUSD * rate;
    return `${selectedCurrency} ${priceInCurrency.toLocaleString()}`; // Mengembalikan harga yang sudah diformat
  } else {
    return "Kurs tidak ditemukan";
  }
};
