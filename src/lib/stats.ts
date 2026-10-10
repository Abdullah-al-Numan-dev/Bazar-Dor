import type { Product } from "./api";

export function priceStats(p: Product) {
  const byMin = [...p.markets].sort((a, b) => a.min - b.min);
  const cheapest = byMin[0];
  const dearest = p.markets.reduce<(typeof p.markets)[number] | undefined>(
    (best, m) => (!best || m.max > best.max ? m : best),
    undefined,
  );
  return {
    rows: byMin, // table is shown cheapest market first
    min: cheapest?.min ?? p.price,
    minMarket: cheapest?.market,
    max: dearest?.max ?? p.price,
    maxMarket: dearest?.market,
    avg: p.price, // API's "today" is the average market price
  };
}
