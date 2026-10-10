import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট — বাজার দর" };

export default async function UpdateProfilePage() {
  const user = await getSessionUser();
  if (!user) redirect("/signin?next=%2Fprofile%2Fupdate");

  return (
    <AuthShell title="তথ্য আপডেট করুন" subtitle="আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।">
      <UpdateProfileForm currentName={user.name} />
    </AuthShell>
  );
}
