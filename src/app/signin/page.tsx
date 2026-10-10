import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";
import { safeNext } from "@/lib/auth-utils";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন ইন — বাজার দর" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const { next } = await searchParams;
  if (await getSessionUser()) redirect("/");
  const target = safeNext(next);

  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে সাইন ইন করুন।">
      <SignInForm next={target} redirected={target !== "/"} />
    </AuthShell>
  );
}
