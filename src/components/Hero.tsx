import Image from "next/image";
import BanglaDate from "./BanglaDate";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100">
        <div className="flex flex-col items-center gap-8 px-4 py-10 md:flex-row md:justify-between md:gap-6 md:px-6">
          <div className="flex max-w-xl flex-col items-start gap-2">
            {/* Eyebrow: today's date, in a pill */}
            <span className="inline-flex min-h-7 min-w-44 items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <BanglaDate className="block text-sm leading-5" />
            </span>

            <h1 className="text-3xl leading-tight font-bold sm:text-4xl sm:leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-1 text-base leading-6">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
              গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Plain anchor: scrolls on the same page, no route change */}
            <a
              href="#সব-পণ্য"
              className="btn btn-primary mt-3 rounded-lg border-primary-strong font-semibold shadow-[0_3px_2px_rgb(5_137_62/0.3)]"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <Image
            src="/bazar-hero.png"
            alt="ঝুড়িভর্তি তাজা সবজি ও ফল"
            width={315}
            height={263}
            priority
            className="h-auto w-56 shrink-0 sm:w-72 md:w-[315px]"
          />
        </div>
      </div>
    </section>
  );
}
