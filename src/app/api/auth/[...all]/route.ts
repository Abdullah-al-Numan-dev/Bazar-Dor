import { handler } from "@/lib/auth-server";

// Proxies BetterAuth requests to the Convex deployment.
export const { GET, POST } = handler;
