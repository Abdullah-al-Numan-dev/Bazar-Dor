import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// Reuse one client across dev hot-reloads and serverless invocations.
const g = globalThis as unknown as { _mongo?: MongoClient };
const client =
  g._mongo ??
  new MongoClient(process.env.MONGODB_URI ?? "mongodb://localhost:27017", {
    serverSelectionTimeoutMS: 8000, // fail fast instead of hanging a page
  });
g._mongo = client;

const db = client.db(process.env.MONGODB_DB ?? "bazardor");

const google =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }
    : null;
const github =
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET }
    : null;

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false, // after sign up the user is sent to the sign-in page
    // No email verification / password reset, by assignment requirement.
  },
  socialProviders: {
    ...(google && { google }),
    ...(github && { github }),
  },
  session: { cookieCache: { enabled: true, maxAge: 5 * 60 } }, // avoids a DB hit on every page
  plugins: [nextCookies()], // must be last
});
