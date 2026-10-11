import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth/minimal";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import authConfig from "./auth.config";

// These run in the CONVEX environment, not .env.local. Set them with:
//   npx convex env set SITE_URL http://localhost:3000
//   npx convex env set BETTER_AUTH_SECRET "$(openssl rand -base64 32)"
//   npx convex env set GOOGLE_CLIENT_ID ...   (and the other OAuth keys)
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

const google =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }
    : null;
const github =
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET }
    : null;

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) =>
  betterAuth({
    baseURL: siteUrl,
    trustedOrigins: [siteUrl, "http://localhost:3000"],
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      autoSignIn: false, // after sign up the user is sent to the sign-in page
      requireEmailVerification: false, // no email verification, by assignment requirement
    },
    socialProviders: {
      ...(google && { google }),
      ...(github && { github }),
    },
    plugins: [convex({ authConfig })],
  });

/** The signed-in user (or null). Used by the Next.js server to render the navbar and guard pages. */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) return null;
    return { name: user.name, email: user.email, image: user.image ?? null };
  },
});
