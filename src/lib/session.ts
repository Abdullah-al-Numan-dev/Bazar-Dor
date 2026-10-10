// Auth gate for protected pages (product details, profile).
//
// TODO(BetterAuth): when auth is wired up, set AUTH_READY = true and make
// getSessionUser() return the real session, e.g.
//   const session = await auth.api.getSession({ headers: await headers() });
//   return session?.user ?? null;
// Until then protected pages stay viewable so the layout can be built and tested.
export const AUTH_READY = false;

export type SessionUser = { name: string; email: string; image?: string | null };

export async function getSessionUser(): Promise<SessionUser | null> {
  return null;
}
