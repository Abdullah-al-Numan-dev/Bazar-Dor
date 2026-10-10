import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import SignUpForm from "@/components/auth/SignUpForm";
import { safeNext } from "@/lib/auth-utils";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন আপ — বাজার দর" };

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const { next } = await searchParams;
  if (await getSessionUser()) redirect("/");

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <SignUpForm next={safeNext(next)} />
    </AuthShell>
  );
}
