export default function AuthSkeleton({ fields = 2 }: { fields?: number }) {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10" role="status" aria-label="লোড হচ্ছে…">
      <div className="flex flex-col gap-2">
        <div className="skeleton h-8 w-40" />
        <div className="skeleton h-4 w-72 max-w-full" />
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 p-6">
        {Array.from({ length: fields }, (_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="skeleton h-4 w-16" />
            <div className="skeleton h-10 w-full rounded-lg" />
          </div>
        ))}
        <div className="skeleton h-10 w-full rounded-lg" />
        <div className="skeleton h-10 w-full rounded-lg" />
      </div>
    </main>
  );
}
