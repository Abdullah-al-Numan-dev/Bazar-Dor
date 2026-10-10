"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { SOCIAL_FLAG } from "./auth/SocialButtons";
import BanglaDate from "./BanglaDate";
import type { Category } from "@/lib/api";

export type NavUser = { name: string; email: string; image?: string | null } | null;

export default function Navbar({ categories, user }: { categories: Category[]; user: NavUser }) {
  const pathname = usePathname();

  // Returning from Google/GitHub: confirm the sign in once.
  useEffect(() => {
    if (!user) return;
    try {
      if (sessionStorage.getItem(SOCIAL_FLAG)) {
        sessionStorage.removeItem(SOCIAL_FLAG);
        toast.success("সফলভাবে সাইন ইন হয়েছে।");
      }
    } catch {}
  }, [user]);

  return (
    <header className="border-b border-base-300 bg-base-100">
      {/* Row 1: logo + date, auth */}
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="বাজার দর — হোম">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="flex flex-col">
            <span className="text-xl font-bold leading-7">বাজার দর</span>
            <BanglaDate />
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {user ? <UserMenu user={user} /> : <AuthButtons />}
        </div>
      </div>

      {/* Row 2: category links */}
      <nav aria-label="পণ্যের ধরন" className="border-t border-base-200">
        <ul className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
          {categories.map((c) => {
            const href = `/category/${c.slug}`;
            const active = pathname === href;
            return (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-colors ${
                    active
                      ? "border-[#047c37] bg-primary-strong text-primary-content"
                      : "border-transparent hover:bg-base-200"
                  }`}
                >
                  <span aria-hidden>{c.emoji}</span>
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

function AuthButtons() {
  return (
    <>
      <Link
        href="/signin"
        className="btn btn-ghost btn-sm sm:btn-md rounded-lg font-semibold"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="btn btn-primary btn-sm sm:btn-md rounded-lg border-primary-strong font-semibold shadow-[0_3px_2px_rgb(5_137_62/0.3)]"
      >
        সাইন আপ
      </Link>
    </>
  );
}

function UserMenu({ user }: { user: NonNullable<NavUser> }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  const router = useRouter();
  const first = user.name.split(" ")[0] || user.name;

  async function signOut() {
    setOpen(false);
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সাইন আউট করা হয়েছে।");
    router.push("/");
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="btn btn-ghost h-10 min-h-10 gap-2 rounded-lg px-3 font-medium"
      >
        <span className="grid size-9 place-items-center overflow-hidden rounded-[10px] bg-primary text-sm font-semibold text-primary-content">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="size-full object-cover" />
          ) : (
            first[0]?.toUpperCase()
          )}
        </span>
        <span className="hidden sm:inline">{first}</span>
        <span aria-hidden className="text-xs">▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-[9px] shadow-[0_10px_15px_rgb(0_0_0/0.1),0_4px_6px_rgb(0_0_0/0.1)]"
        >
          <div className="px-3 py-2">
            <p className="text-sm">{user.name}</p>
            <p className="truncate text-xs text-base-content/70">{user.email}</p>
          </div>
          <Link role="menuitem" href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm hover:bg-base-200">
            👤 আমার প্রোফাইল
          </Link>
          <button
            role="menuitem"
            onClick={signOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm text-error hover:bg-error/10"
          >
            ↩ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}
