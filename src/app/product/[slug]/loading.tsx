export default function Loading() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="skeleton h-5 w-56" />
      <div className="flex items-center gap-4 rounded-2xl border border-base-300 p-5">
        <div className="skeleton size-20 rounded-2xl" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-8 w-52" />
          <div className="skeleton h-4 w-32" />
          <div className="skeleton h-4 w-64 max-w-full" />
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}
        </div>
        <div className="skeleton h-72 rounded-2xl" />
      </div>
    </main>
  );
}
