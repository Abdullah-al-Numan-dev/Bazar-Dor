import { CardSkeleton } from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="skeleton h-5 w-32" />
      <div className="flex items-center gap-3 rounded-2xl border border-base-300 p-5">
        <div className="skeleton size-10 rounded-xl" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-6 w-24" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>
      <div className="skeleton h-[66px] rounded-2xl" />
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => <CardSkeleton key={i} />)}
      </div>
    </main>
  );
}
