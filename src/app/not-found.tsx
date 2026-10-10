import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-20 text-center">
      <p className="text-6xl" aria-hidden>🛒</p>
      <h1 className="text-3xl font-bold">৪০৪ — পাওয়া যায়নি</h1>
      <p className="text-base-content/70">আপনি যে পাতাটি খুঁজছেন তা পাওয়া যায়নি।</p>
      <Link href="/" className="btn btn-primary mt-2 rounded-lg border-primary-strong font-semibold">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
