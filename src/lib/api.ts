// Single place that talks to the Bazardor API. Shapes match the real responses.

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor", // alternative
];

export type Category = { id: string; slug: string; name: string; emoji: string };

export type Market = { market: string; division: string; min: number; max: number };

export type Product = {
  id: number;
  slug: string;
  name: string; // nameBn
  emoji: string; // image
  category: string; // category slug
  categoryName: string;
  categoryEmoji: string;
  unit: string; // Bangla: কেজি / লিটার / ডজন / পিস
  price: number; // today
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: number; // signed percent: + up, - down, 0 flat
  markets: Market[];
};

const UNITS_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

async function get<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return (await res.json()) as T;
    } catch {
      /* try the alternative base */
    }
  }
  return null;
}

/** Used only if both API hosts are unreachable, so the navbar never renders empty. */
export const FALLBACK_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", name: "চাল", emoji: "🍚" },
  { id: "dal", slug: "dal", name: "ডাল", emoji: "🫘" },
  { id: "tel", slug: "tel", name: "তেল", emoji: "🛢️" },
  { id: "sobji", slug: "sobji", name: "সবজি", emoji: "🥬" },
  { id: "mach", slug: "mach", name: "মাছ", emoji: "🐟" },
  { id: "mangsho", slug: "mangsho", name: "মাংস", emoji: "🍗" },
  { id: "dim-dui", slug: "dim-dui", name: "ডিম-দুধ", emoji: "🥛" },
  { id: "mosla", slug: "mosla", name: "মসলা", emoji: "🌶️" },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const toCategory = (c: any): Category => ({
  id: String(c.id),
  slug: String(c.slug),
  name: String(c.nameBn),
  emoji: String(c.icon ?? ""),
});

const toProduct = (p: any): Product => ({
  id: Number(p.id),
  slug: String(p.slug),
  name: String(p.nameBn),
  emoji: String(p.image ?? p.categoryIcon ?? "🛒"),
  category: String(p.category),
  categoryName: String(p.categoryNameBn),
  categoryEmoji: String(p.categoryIcon ?? ""),
  unit: UNITS_BN[p.unit] ?? String(p.unit),
  price: Number(p.today),
  yesterday: Number(p.yesterday),
  lastWeek: Number(p.lastWeek),
  lastMonth: Number(p.lastMonth),
  // API already signs pct (down is negative); dir is the source of truth for flat.
  change: p.change?.dir === "flat" ? 0 : Number(p.change?.pct ?? 0),
  markets: Array.isArray(p.markets) ? p.markets : [],
});
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getCategories(): Promise<Category[]> {
  const raw = await get<unknown[]>("/categories");
  return raw?.length ? raw.map(toCategory) : FALLBACK_CATEGORIES;
}

export async function getCategory(slug: string): Promise<Category | null> {
  const list = await getCategories();
  return list.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const raw = await get<unknown[]>(category ? `/products?category=${encodeURIComponent(category)}` : "/products");
  return raw ? raw.map(toProduct) : [];
}

/** Detail pages are keyed by slug (/product/[slug]); the API looks up by id, so find it in the list. */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

/** Home sections: biggest risers / fallers. */
export const topRisers = (ps: Product[], n = 6) =>
  [...ps].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, n);
export const topFallers = (ps: Product[], n = 6) =>
  [...ps].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, n);
