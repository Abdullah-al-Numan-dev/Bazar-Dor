import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/api";

function Item({ p }: { p: Product }) {
  const dir = p.change > 0 ? "up" : p.change < 0 ? "down" : "flat";
  // Figma: price rise is red (bad for buyers), fall is green.
  const color = { up: "text-error", down: "text-success", flat: "text-base-content/60" }[dir];
  const badge =
    dir === "up" ? `▲ ${toBn(p.change)}%` : dir === "down" ? `▼ ${toBn(Math.abs(p.change))}%` : "— ০.০%";
  return (
    <li className="flex h-9 shrink-0 items-center gap-1.5 border-r border-base-200 px-4 text-sm whitespace-nowrap">
      <span aria-hidden>{p.emoji}</span>
      <span className="font-medium">{p.name}</span>
      <span>{toBn(p.price)} টাকা/{p.unit}</span>
      <span className={`font-semibold ${color}`}>{badge}</span>
    </li>
  );
}

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <div className="ticker overflow-hidden border-b border-base-300 bg-base-100" role="marquee" aria-label="আজকের দামের তালিকা">
      <div className="ticker-track">
        {/* rendered twice; the second copy is hidden from assistive tech */}
        <ul className="flex">{products.map((p) => <Item key={p.id} p={p} />)}</ul>
        <ul className="flex" aria-hidden>{products.map((p) => <Item key={`d-${p.id}`} p={p} />)}</ul>
      </div>
    </div>
  );
}
