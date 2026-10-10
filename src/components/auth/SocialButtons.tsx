"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-utils";

type Provider = "google" | "github";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export const SOCIAL_FLAG = "bazardor:social-login";

export default function SocialButtons({ next = "/" }: { next?: string }) {
  const [busy, setBusy] = useState<Provider | null>(null);

  async function go(provider: Provider) {
    setBusy(provider);
    // Lets the navbar show a "signed in" toast after the OAuth round-trip.
    try { sessionStorage.setItem(SOCIAL_FLAG, "1"); } catch {}
    const { error } = await authClient.signIn.social({ provider, callbackURL: next });
    if (error) {
      try { sessionStorage.removeItem(SOCIAL_FLAG); } catch {}
      toast.error(authErrorMessage(error.code));
      setBusy(null);
    }
    // on success the browser is redirected to the provider
  }

  const cls =
    "btn h-10 min-h-10 flex-1 gap-1.5 rounded-lg px-2 whitespace-nowrap border-base-300 bg-base-100 text-sm font-semibold hover:bg-base-200";

  return (
    <div className="flex flex-col gap-2 min-[480px]:flex-row">
      <button type="button" onClick={() => go("google")} disabled={busy !== null} className={cls}>
        <span className={busy === "google" ? "hidden" : ""} aria-hidden="true"><GoogleIcon /></span>
        <span className={`loading loading-spinner loading-xs ${busy === "google" ? "" : "hidden"}`} aria-hidden="true" />
        Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" onClick={() => go("github")} disabled={busy !== null} className={cls}>
        <span className={busy === "github" ? "hidden" : ""} aria-hidden="true"><GitHubIcon /></span>
        <span className={`loading loading-spinner loading-xs ${busy === "github" ? "" : "hidden"}`} aria-hidden="true" />
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}

export function OrDivider() {
  return (
    <div className="flex items-center gap-3 text-xs" role="separator">
      <span className="h-px flex-1 bg-base-300" />
      অথবা
      <span className="h-px flex-1 bg-base-300" />
    </div>
  );
}
