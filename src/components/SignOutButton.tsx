"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      setLoading(false);
      return;
    }
    toast.success("সাইন আউট করা হয়েছে।");
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={loading}
      className="btn h-10 min-h-10 gap-1.5 rounded-lg border-error bg-transparent px-4 text-sm font-semibold text-error hover:bg-error/10"
    >
      <span className={`loading loading-spinner loading-xs ${loading ? "" : "hidden"}`} aria-hidden="true" />
      <span aria-hidden>↩</span> সাইন আউট
    </button>
  );
}
