export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-base-content/70">ক্যাটেগরি: {slug} (পরের ধাপে আসছে)</p>
    </main>
  );
}
