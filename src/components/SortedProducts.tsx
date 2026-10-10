"use client";
import { useId, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/api";

type Sort = "default" | "asc" | "desc";

const OPTIONS: { value: Sort; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortedProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");
  const selectId = useId();

  // Sorts by the numeric price (never the Bengali-digit string).
  const items = useMemo(() => {
    if (sort === "default") return products;
    return [...products].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
  }, [products, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-base-300 bg-base-100 p-4">
        <label htmlFor={selectId} className="text-sm">সাজান</label>
        <div className="relative">
          <select
            id={selectId}
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-8 cursor-pointer appearance-none rounded-lg border border-base-content bg-base-100 py-0 pr-8 pl-3 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 10 10"
            className="pointer-events-none absolute top-1/2 right-3 size-2.5 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3.5 5 6.5 8 3.5" />
          </svg>
        </div>
      </div>

      <p className="text-sm" aria-live="polite">মোট {toBn(items.length)}টি পণ্য দেখানো হচ্ছে</p>

      <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
