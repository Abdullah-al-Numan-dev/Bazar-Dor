import { GRID } from "./ProductSection";

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-base-300 p-4" aria-hidden>
      <div className="flex items-center gap-3">
        <div className="skeleton size-12 rounded-xl" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-14" />
          <div className="skeleton h-6 w-20" />
        </div>
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function SectionSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="mb-4 flex flex-col gap-2">
        <div className="skeleton h-7 w-48" />
        <div className="skeleton h-4 w-72 max-w-full" />
      </div>
      <div className={GRID}>
        {Array.from({ length: count }, (_, i) => <CardSkeleton key={i} />)}
      </div>
    </section>
  );
}
