"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, EMAIL_RE, GENERIC_ERROR } from "@/lib/auth-utils";
import { Field, inputClass } from "./AuthShell";
import PasswordInput from "./PasswordInput";
import SocialButtons, { OrDivider } from "./SocialButtons";

export default function SignInForm({ next, redirected }: { next: string; redirected: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  // Sent here by a protected page: tell the user why.
  useEffect(() => {
    if (redirected) toast("এই পাতা দেখতে আগে সাইন ইন করুন।", { id: "protected", icon: "🔒" });
  }, [redirected]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next_: typeof errors = {};
    if (!EMAIL_RE.test(email.trim())) next_.email = "সঠিক ইমেইল ঠিকানা দিন।";
    if (!password) next_.password = "পাসওয়ার্ড দিন।";
    setErrors(next_);
    if (next_.email || next_.password) {
      toast.error(next_.email ?? next_.password!);
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({ email: email.trim(), password });
      if (error) {
        toast.error(authErrorMessage(error.code));
        return;
      }
      toast.success("সফলভাবে সাইন ইন হয়েছে।");
      router.replace(next);
      router.refresh();
    } catch {
      toast.error(GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <Field id="email" label="ইমেইল" error={errors.email}>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass(!!errors.email)}
        />
      </Field>
      <Field id="password" label="পাসওয়ার্ড" error={errors.password}>
        <PasswordInput
          id="password"
          value={password}
          onChange={setPassword}
          invalid={!!errors.password}
          placeholder="কমপক্ষে ৮ অক্ষর"
          autoComplete="current-password"
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary h-10 min-h-10 rounded-lg border-primary-strong font-semibold shadow-[0_3px_2px_rgb(5_137_62/0.3)]"
      >
        <span className={`loading loading-spinner loading-xs ${loading ? "" : "hidden"}`} aria-hidden="true" />
        সাইন ইন
      </button>

      <OrDivider />
      <SocialButtons next={next} />

      <p className="text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href={next === "/" ? "/signup" : `/signup?next=${encodeURIComponent(next)}`}
          className="text-primary hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}
