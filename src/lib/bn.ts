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

const bnPct = new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** 2.1 -> "২.১" ; 0 -> "০.০" */
export const toBnPct = (n: number) => bnPct.format(n);

const bnMoney2 = new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Whole amounts stay clean ("৬২"), halves show two decimals ("৬৩.৫০"), as in the Figma. */
export const toBnMoney = (n: number) => (Number.isInteger(n) ? toBn(n) : bnMoney2.format(n));
