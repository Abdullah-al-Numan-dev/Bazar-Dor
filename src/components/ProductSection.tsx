import ProductCard from "./ProductCard";
import type { Product } from "@/lib/api";

export const GRID = "grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3";

export function SectionHeader({
  id,
  title,
  subtitle,
}: {
  id?: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mb-4">
      <h2 id={id} className="text-xl font-bold sm:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-base-content/70">{subtitle}</p>}
    </div>
  );
}

export default function ProductSection({
  id,
  title,
  subtitle,
  products,
}: {
  id?: string;
  title: React.ReactNode;
  subtitle?: string;
  products: Product[];
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-4 px-4 py-6">
      <SectionHeader title={title} subtitle={subtitle} />
      {products.length ? (
        <ul className={GRID}>
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-base-300 p-6 text-center text-base-content/70">
          এই মুহূর্তে কোনো পণ্য নেই।
        </p>
      )}
    </section>
  );
}
