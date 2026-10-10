import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import SortedProducts from "@/components/SortedProducts";
import { getCategory, getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCategory(slug);
  return { title: c ? `${c.name} এর দাম — বাজার দর` : "ক্যাটেগরি পাওয়া যায়নি — বাজার দর" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);

  // Invalid slug: 404-style state with a way back home.
  if (!category) notFound();

  const products = await getProducts(category.slug);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <nav aria-label="breadcrumb" className="text-sm">
        <ol className="flex items-center gap-3">
          <li><Link href="/" className="hover:underline">হোম</Link></li>
          <li aria-hidden className="text-xs">›</li>
          <li aria-current="page" className="font-medium">{category.name}</li>
        </ol>
      </nav>

      <header className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <span className="text-4xl" aria-hidden>{category.emoji}</span>
        <div>
          <h1 className="text-2xl leading-8 font-bold">{category.name}</h1>
          <p className="text-sm">{toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </header>

      {products.length ? (
        <SortedProducts products={products} />
      ) : (
        <EmptyState
          emoji={category.emoji}
          title="এই ক্যাটেগরিতে কোনো পণ্য নেই"
          message="এখন এখানে দেখানোর মতো কোনো পণ্য পাওয়া যায়নি। অন্য ক্যাটেগরি দেখুন।"
        />
      )}
    </main>
  );
}
