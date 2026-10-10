import Link from "next/link";
import { toBn, toBnPct } from "@/lib/bn";
import type { Product } from "@/lib/api";

/** Change badge. Colors follow the Figma: rise = red, fall = green, flat = gray. */
export function ChangeBadge({ change }: { change: number }) {
  const dir = change > 0 ? "up" : change < 0 ? "down" : "flat";
  const style = {
    up: "text-error",
    down: "text-success",
    flat: "text-base-content",
  }[dir];
  const icon = { up: "▲", down: "▼", flat: "—" }[dir];
  return (
    <span
      className={`inline-flex h-6 items-center gap-1 rounded-full bg-base-200 px-2 text-xs ${style}`}
      aria-label={dir === "up" ? "দাম বেড়েছে" : dir === "down" ? "দাম কমেছে" : "দাম অপরিবর্তিত"}
    >
      <span aria-hidden>{icon}</span>
      <span className="font-semibold">{toBnPct(Math.abs(change))}%</span>
    </span>
  );
}

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl" aria-hidden>
          {p.emoji}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base leading-6 font-semibold">{p.name}</h3>
          <p className="text-xs">প্রতি {p.unit}</p>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs">আজকের দাম</p>
          <p className="leading-7">
            <span className="text-xl font-bold">{toBn(p.price)}</span>{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
