/** Only allow same-site relative paths, so ?next= can't redirect to another site. */
export function safeNext(next: string | string[] | undefined | null): string {
  const v = Array.isArray(next) ? next[0] : next;
  return v && v.startsWith("/") && !v.startsWith("//") && !v.startsWith("/\\") ? v : "/";
}

const MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা দিন।",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  PROVIDER_NOT_FOUND: "এই সাইন ইন পদ্ধতি এখনো চালু করা হয়নি।",
};

export const GENERIC_ERROR = "কিছু একটা সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";

export const authErrorMessage = (code?: string) => (code && MESSAGES[code]) || GENERIC_ERROR;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
