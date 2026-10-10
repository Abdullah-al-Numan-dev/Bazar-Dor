"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { GENERIC_ERROR } from "@/lib/auth-utils";
import { Field, inputClass } from "./auth/AuthShell";

export default function UpdateProfileForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = name.trim();
    if (value.length < 2) {
      setError("আপনার নাম লিখুন।");
      toast.error("আপনার নাম লিখুন।");
      return;
    }
    setError(undefined);
    if (value === currentName) {
      toast("নামে কোনো পরিবর্তন করা হয়নি।", { icon: "ℹ️" });
      return;
    }

    setLoading(true);
    try {
      const { error: err } = await authClient.updateUser({ name: value });
      if (err) {
        toast.error(GENERIC_ERROR);
        return;
      }
      // Pull a fresh session so the cached cookie shows the new name right away.
      await authClient.getSession({ query: { disableCookieCache: true } });
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে।");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error(GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <Field id="name" label="নাম" error={error}>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="যেমন: রহিম উদ্দিন"
          autoComplete="name"
          aria-invalid={!!error}
          aria-describedby={error ? "name-error" : undefined}
          className={inputClass(!!error)}
        />
      </Field>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary h-10 min-h-10 flex-1 rounded-lg border-primary-strong font-semibold shadow-[0_3px_2px_rgb(5_137_62/0.3)]"
        >
          <span className={`loading loading-spinner loading-xs ${loading ? "" : "hidden"}`} aria-hidden="true" />
          তথ্য আপডেট করুন
        </button>
        <Link href="/profile" className="btn h-10 min-h-10 rounded-lg border-base-300 bg-base-100 font-semibold hover:bg-base-200">
          বাতিল
        </Link>
      </div>
    </form>
  );
}
