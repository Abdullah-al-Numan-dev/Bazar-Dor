import { Suspense } from "react";
import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";
import { SectionSkeleton } from "@/components/ProductSkeleton";

export default function Home() {
  return (
    <main className="pb-12">
      <Hero />
      {/* Hero shows instantly; skeletons stand in while product data loads */}
      <Suspense
        fallback={
          <div id="সব-পণ্য" className="scroll-mt-4">
            <SectionSkeleton />
            <SectionSkeleton />
            <SectionSkeleton count={9} />
          </div>
        }
      >
        <HomeSections />
      </Suspense>
    </main>
  );
}
