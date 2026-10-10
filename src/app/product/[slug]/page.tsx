import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import MarketTable from "@/components/MarketTable";
import PriceStat from "@/components/PriceStat";
import { ChangeBadge } from "@/components/ProductCard";
import { getProductBySlug } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { AUTH_READY, getSessionUser } from "@/lib/session";
import { priceStats } from "@/lib/stats";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  return { title: p ? `${p.name} এর দাম — বাজার দর` : "পণ্য পাওয়া যায়নি — বাজার দর" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // Protected route: send guests to sign in, then bring them back here.
  if (AUTH_READY && !(await getSessionUser())) {
    redirect(`/signin?next=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const s = priceStats(p);
  const diff = Math.abs(p.price - p.yesterday);
  const trend =
    p.change > 0
      ? { word: "বেড়েছে", text: `গতকালের তুলনায় আজ দাম` }
      : p.change < 0
        ? { word: "কমেছে", text: `গতকালের তুলনায় আজ দাম` }
        : null;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <li><Link href="/" className="hover:underline">হোম</Link></li>
          <li aria-hidden className="text-xs">›</li>
          <li><Link href={`/category/${p.category}`} className="hover:underline">{p.categoryName}</Link></li>
          <li aria-hidden className="text-xs">›</li>
          <li aria-current="page" className="font-medium">{p.name}</li>
        </ol>
      </nav>

      {/* Summary */}
      <header className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center">
        <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl" aria-hidden>
          {p.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl leading-9 font-bold sm:text-3xl">{p.name}</h1>
          <p className="mt-0.5 text-sm">প্রতি {p.unit} · {p.categoryName}</p>
          <p className="mt-2 text-sm">
            {trend ? (
              <>
                {trend.text} <strong className="font-semibold">{trend.word}</strong> · {toBn(diff)} টাকা
              </>
            ) : (
              <>গতকালের তুলনায় আজ দাম <strong className="font-semibold">অপরিবর্তিত</strong></>
            )}
          </p>
          <ul className="mt-3 flex flex-wrap items-center gap-2">
            <li>
              <Link
                href={`/category/${p.category}`}
                className="inline-flex h-7 items-center gap-1 rounded-full bg-primary/10 px-3 text-xs font-medium text-primary hover:bg-primary/20"
              >
                <span aria-hidden>{p.categoryEmoji}</span> {p.categoryName}
              </Link>
            </li>
            <li className="inline-flex h-7 items-center rounded-full bg-base-200 px-3 text-xs font-medium">
              প্রতি {p.unit}
            </li>
          </ul>
        </div>
        <ChangeBadge change={p.change} />
      </header>

      {/* Price summary + market table */}
      <div className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-4 sm:p-5">
        <section aria-labelledby="summary" className="flex flex-col gap-3">
          <h2 id="summary" className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <PriceStat
              label="সর্বনিম্ন দাম"
              value={s.min}
              tone="text-success"
              note={s.minMarket ? `সবচেয়ে কম দামের বাজার: ${s.minMarket}` : "সবচেয়ে কম দামের বাজার"}
            />
            <PriceStat
              label="সর্বাধিক দাম"
              value={s.max}
              tone="text-error"
              note={s.maxMarket ? `সবচেয়ে বেশি দামের বাজার: ${s.maxMarket}` : "সবচেয়ে বেশি দামের বাজার"}
            />
            <PriceStat label="গড় দাম" value={s.avg} tone="text-primary" note={`প্রতি ${p.unit}-এর হিসাবে`} />
          </div>
        </section>

        <section aria-labelledby="markets" className="flex flex-col gap-3">
          <h2 id="markets" className="text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          {s.rows.length ? (
            <MarketTable rows={s.rows} />
          ) : (
            <p className="rounded-2xl border border-base-300 p-6 text-center text-base-content/70">
              বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
