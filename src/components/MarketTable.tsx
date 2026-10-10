import { toBn, toBnMoney } from "@/lib/bn";
import type { Market } from "@/lib/api";

export default function MarketTable({ rows }: { rows: Market[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
      {/* wide table scrolls inside its own box on small screens */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <caption className="sr-only">বাজারভিত্তিক আজকের দাম</caption>
          <thead>
            <tr className="border-b border-base-content/80 text-sm font-bold">
              <th scope="col" className="px-4 py-3 text-left">বাজার</th>
              <th scope="col" className="px-4 py-3 text-left">বিভাগ</th>
              <th scope="col" className="px-4 py-3 text-right">সর্বনিম্ন</th>
              <th scope="col" className="px-4 py-3 text-right">সর্বাধিক</th>
              <th scope="col" className="px-4 py-3 text-right">গড়</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.market} className="border-b border-base-200 last:border-b-0 even:bg-base-200">
                <th scope="row" className="px-4 py-3 text-left font-medium">{m.market}</th>
                <td className="px-4 py-3 text-left">{m.division}</td>
                <td className="px-4 py-3 text-right">{toBn(m.min)} টাকা</td>
                <td className="px-4 py-3 text-right">{toBn(m.max)} টাকা</td>
                <td className="px-4 py-3 text-right font-semibold">{toBnMoney((m.min + m.max) / 2)} টাকা</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
