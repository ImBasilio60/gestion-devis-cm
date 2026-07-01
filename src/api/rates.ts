const CACHE_KEY = "usd_eur_rate";
const CACHE_TTL = 60 * 60 * 1000;

interface Cache {
  rate: number;
  timestamp: number;
}

export async function fetchUsdToEurRate(): Promise<number> {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data = JSON.parse(cached) as Cache;
      if (Date.now() - data.timestamp < CACHE_TTL) {
        return data.rate;
      }
    }
  } catch {}

  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const json = await res.json();
    const rate: number = json.rates.EUR;
    const cache: Cache = { rate, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    return rate;
  } catch {
    return 0.92;
  }
}
