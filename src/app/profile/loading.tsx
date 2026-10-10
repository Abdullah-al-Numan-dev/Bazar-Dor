export default function Loading() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="flex flex-col gap-2">
        <div className="skeleton h-8 w-44" />
        <div className="skeleton h-4 w-64 max-w-full" />
      </div>
      <div className="flex items-center gap-4 rounded-2xl border border-base-300 p-6">
        <div className="skeleton size-20 rounded-2xl" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="skeleton h-6 w-40" />
          <div className="skeleton h-4 w-56 max-w-full" />
        </div>
      </div>
      <div className="skeleton h-48 rounded-2xl" />
    </main>
  );
}
