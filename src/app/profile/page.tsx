import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProfileAvatar from "@/components/ProfileAvatar";
import SignOutButton from "@/components/SignOutButton";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) redirect("/signin?next=%2Fprofile");

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 pb-16">
      <header>
        <h1 className="text-2xl leading-8 font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </header>

      <section
        aria-label="অ্যাকাউন্ট"
        className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center"
      >
        <ProfileAvatar name={user.name} image={user.image} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xl">{user.name}</p>
          <p className="truncate">{user.email}</p>
        </div>
        <SignOutButton />
      </section>

      <section aria-labelledby="info" className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-6">
        <h2 id="info" className="text-lg font-semibold">তথ্য</h2>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="min-w-0 rounded-lg bg-base-200 px-4 py-3">
            <dt className="text-xs">নাম</dt>
            <dd className="truncate text-sm font-medium">{user.name}</dd>
          </div>
          <div className="min-w-0 rounded-lg bg-base-200 px-4 py-3">
            <dt className="text-xs">ইমেইল</dt>
            <dd className="truncate text-sm font-medium">{user.email}</dd>
          </div>
        </dl>
        <Link
          href="/profile/update"
          className="btn btn-primary mt-1 h-10 min-h-10 self-start rounded-lg border-primary-strong font-semibold shadow-[0_3px_2px_rgb(5_137_62/0.3)]"
        >
          আপডেট
        </Link>
      </section>
    </main>
  );
}
