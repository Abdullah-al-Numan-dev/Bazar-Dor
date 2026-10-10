"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, EMAIL_RE, GENERIC_ERROR } from "@/lib/auth-utils";
import { Field, inputClass } from "./AuthShell";
import PasswordInput from "./PasswordInput";
import SocialButtons, { OrDivider } from "./SocialButtons";

type Errors = { name?: string; email?: string; password?: string };

export default function SignUpForm({ next }: { next: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v: Errors = {};
    if (name.trim().length < 2) v.name = "আপনার নাম লিখুন।";
    if (!EMAIL_RE.test(email.trim())) v.email = "সঠিক ইমেইল ঠিকানা দিন।";
    if (password.length < 8) v.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    setErrors(v);
    const first = v.name ?? v.email ?? v.password;
    if (first) {
      toast.error(first);
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({ name: name.trim(), email: email.trim(), password });
      if (error) {
        toast.error(authErrorMessage(error.code));
        return;
      }
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
      router.push(next === "/" ? "/signin" : `/signin?next=${encodeURIComponent(next)}`);
    } catch {
      toast.error(GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <Field id="name" label="নাম" error={errors.name}>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="যেমন: রহিম উদ্দিন"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass(!!errors.name)}
        />
      </Field>
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
          autoComplete="new-password"
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary h-10 min-h-10 rounded-lg border-primary-strong font-semibold shadow-[0_3px_2px_rgb(5_137_62/0.3)]"
      >
        <span className={`loading loading-spinner loading-xs ${loading ? "" : "hidden"}`} aria-hidden="true" />
        অ্যাকাউন্ট তৈরি করুন
      </button>

      <OrDivider />
      <SocialButtons next={next} />

      <p className="text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href={next === "/" ? "/signin" : `/signin?next=${encodeURIComponent(next)}`}
          className="text-primary hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}
