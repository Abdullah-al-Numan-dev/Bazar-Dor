import Link from "next/link";

/** 404-style message with a way back home. Used for invalid slugs and empty categories. */
export default function EmptyState({
  title,
  message,
  emoji = "🛒",
}: {
  title: string;
  message: string;
  emoji?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
      <p className="text-6xl" aria-hidden>{emoji}</p>
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="max-w-md text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-2 rounded-lg border-primary-strong font-semibold">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
