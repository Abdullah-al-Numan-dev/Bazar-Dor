import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Placeholder: the CTA scrolls here. Product sections come in the next step. */}
      <section id="সব-পণ্য" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-10">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="mt-1 text-base-content/70">পণ্যের তালিকা পরের ধাপে আসছে।</p>
        <div className="h-[60vh]" aria-hidden />
      </section>
    </main>
  );
}
