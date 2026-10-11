import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

// Serves BetterAuth's /api/auth/* routes from Convex. Next.js proxies to these.
authComponent.registerRoutes(http, createAuth);

export default http;
