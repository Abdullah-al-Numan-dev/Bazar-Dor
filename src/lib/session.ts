import { headers } from "next/headers";
import { auth } from "./auth";

// Auth gate for protected pages (product details, profile).
export const AUTH_READY = true;

export type SessionUser = { name: string; email: string; image?: string | null };

/** Current user, or null. Never throws: if the DB is down, pages still render as signed-out. */
export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return null;
    const { name, email, image } = session.user;
    return { name, email, image };
  } catch {
    return null;
  }
}
