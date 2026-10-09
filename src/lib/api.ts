// Adjust the field names in the normalize* functions below if the API
// returns different keys. Nothing else in the app reads raw API data.

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export type Category = { slug: string; name: string; emoji: string };
export type Product = {
  id: string | number;
  name: string;
  emoji: string;
  price: number;
  unit: string;
  change: number; // percent; + up, - down, 0 flat
};

async function get<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return (await res.json()) as T;
    } catch {
      /* try next base */
    }
  }
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const list = (d: any): any[] => (Array.isArray(d) ? d : d?.data ?? d?.products ?? d?.categories ?? []);

/** Static fallback so the navbar never renders empty (matches the Figma). */
export const FALLBACK_CATEGORIES: Category[] = [
  { slug: "chal", name: "চাল", emoji: "🍚" },
  { slug: "dal", name: "ডাল", emoji: "🫘" },
  { slug: "tel", name: "তেল", emoji: "🛢️" },
  { slug: "sobji", name: "সবজি", emoji: "🥬" },
  { slug: "mach", name: "মাছ", emoji: "🐟" },
  { slug: "mangsho", name: "মাংস", emoji: "🍗" },
  { slug: "dim-dudh", name: "ডিম-দুধ", emoji: "🥛" },
  { slug: "moshla", name: "মসলা", emoji: "🌶️" },
];

export async function getCategories(): Promise<Category[]> {
  const raw = list(await get("/categories"));
  const out = raw
    .map((c) => ({
      slug: String(c.slug ?? c.id ?? ""),
      name: String(c.name ?? c.title ?? c.nameBn ?? ""),
      emoji: String(c.emoji ?? c.icon ?? ""),
    }))
    .filter((c) => c.slug && c.name);
  return out.length ? out : FALLBACK_CATEGORIES;
}

export async function getProducts(): Promise<Product[]> {
  const raw = list(await get("/products"));
  return raw.map((p) => ({
    id: p.id ?? p.slug,
    name: String(p.name ?? p.title ?? p.nameBn ?? ""),
    emoji: String(p.emoji ?? p.icon ?? "🛒"),
    price: Number(p.price ?? p.todayPrice ?? p.avgPrice ?? 0),
    unit: String(p.unit ?? "কেজি").replace(/^প্রতি\s*/, ""),
    change: Number(p.change ?? p.changePercent ?? p.percentChange ?? 0),
  }));
}
