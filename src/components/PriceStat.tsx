import { toBn } from "@/lib/bn";

export default function PriceStat({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: number;
  note: string;
  tone: "text-success" | "text-error" | "text-primary";
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-base-300 bg-base-100 px-6 py-4">
      <span className="text-xs">{label}</span>
      <span className={`${tone} leading-8`}>
        <span className="text-2xl font-bold">{toBn(value)}</span>{" "}
        <span className="text-sm font-medium">টাকা</span>
      </span>
      <span className="text-xs">{note}</span>
    </div>
  );
}
