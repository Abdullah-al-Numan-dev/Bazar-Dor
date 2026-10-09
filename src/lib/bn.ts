const bnNumber = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 1 });

/** 1850 -> "১,৮৫০" ; 2.1 -> "২.১" */
export const toBn = (n: number) => bnNumber.format(n);

/** "মঙ্গলবার, ৬ অক্টোবর, ২০২৬" (Dhaka time) */
export function banglaDate(d: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    timeZone: "Asia/Dhaka",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}
