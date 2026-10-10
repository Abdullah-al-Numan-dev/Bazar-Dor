import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl">
      <EmptyState title="৪০৪ — পাওয়া যায়নি" message="আপনি যে পাতাটি খুঁজছেন তা পাওয়া যায়নি।" />
    </main>
  );
}
