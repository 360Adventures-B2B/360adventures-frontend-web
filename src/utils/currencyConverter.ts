interface CurrencyRates {
  [key: string]: number;
}

const defaultCurrencyRates: CurrencyRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110.0,
  IDR: 15000,
  AUD: 1.35,
};

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

export const getCurrencySymbol = (currency: string): string => {
  return currencySymbols[currency] || "";
};

export const formatNumber = (priceInUSD: number): string => {
  const rates = getCurrencyRatesFromLocalStorage();
  const selectedCurrency = "USD";

  const rate = rates[selectedCurrency];
  const symbol = getCurrencySymbol(selectedCurrency);
  if (rate) {
    const priceInCurrency = priceInUSD * rate;
    const isWholeNumber = priceInCurrency % 1 === 0;

    if (isWholeNumber) {
      return `${selectedCurrency} ${Math.floor(priceInCurrency).toLocaleString()}`;
    } else {
      return `${selectedCurrency} ${priceInCurrency.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  } else {
    return "Currency not found";
  }
};
