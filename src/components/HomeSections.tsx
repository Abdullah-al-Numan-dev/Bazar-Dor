import ProductSection from "./ProductSection";
import { getProducts, topFallers, topRisers } from "@/lib/api";

export default async function HomeSections() {
  const products = await getProducts();

  if (!products.length) {
    return (
      <section id="সব-পণ্য" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-10">
        <div className="rounded-2xl border border-base-300 p-8 text-center">
          <p className="text-lg font-semibold">পণ্যের তালিকা লোড করা যায়নি</p>
          <p className="mt-1 text-sm text-base-content/70">অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন।</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <ProductSection
        title={<>আজ দাম বেড়েছে <span className="text-error">▲</span></>}
        subtitle="গতকালের তুলনায় সবচেয়ে বেশি দাম বেড়েছে এমন ৬টি পণ্য"
        products={topRisers(products)}
      />
      <ProductSection
        title={<>আজ দাম কমেছে <span className="text-success">▼</span></>}
        subtitle="গতকালের তুলনায় সবচেয়ে বেশি দাম কমেছে এমন ৬টি পণ্য"
        products={topFallers(products)}
      />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="সব ক্যাটেগরির পণ্যের আজকের দাম — বিস্তারিত দেখতে যেকোনো পণ্যে ক্লিক করুন"
        products={products}
      />
    </>
  );
}
