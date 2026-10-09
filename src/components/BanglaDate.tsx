"use client";
import { useSyncExternalStore } from "react";
import { banglaDate } from "@/lib/bn";

const subscribe = () => () => {};

/** Empty on the server, real date on the client: a static build never shows a stale date. */
export default function BanglaDate() {
  const text = useSyncExternalStore(subscribe, () => banglaDate(), () => "");
  return <span className="block h-4 text-xs leading-4 text-base-content/80">{text}</span>;
}
