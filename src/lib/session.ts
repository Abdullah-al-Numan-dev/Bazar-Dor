import { getSessionCookie } from "better-auth/cookies";
import { headers } from "next/headers";
import { api } from "../../convex/_generated/api";
import { fetchAuthQuery } from "./auth-server";

// Auth gate for protected pages (product details, profile).
export const AUTH_READY = true;

export type SessionUser = { name: string; email: string; image?: string | null };

/**
 * Current user, or null. Never throws: if Convex is unreachable, pages still render as signed-out.
 * Guests (no session cookie) return immediately without any network call.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    if (!getSessionCookie(await headers())) return null;
    return await fetchAuthQuery(api.auth.getCurrentUser, {});
  } catch {
    return null;
  }
}
