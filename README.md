<div align="center">

# 🛒 বাজার দর — BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**
*Daily essential-goods prices across Bangladesh's markets, at a glance.*

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![BetterAuth](https://img.shields.io/badge/BetterAuth-Convex-05893E)

**[🌐 Live Site](#) · [📦 GitHub Repository](#)**

</div>

---

## 📖 About

**BazarDor** (বাজার দর) lets people check today's prices of everyday items — rice, pulses, oil,
vegetables, fish, meat, eggs & dairy, and spices — and see whether each price **rose or fell**
compared with yesterday. Signed-in users can open any product to compare the **minimum, maximum and
average price** and browse **prices market by market** across Dhaka, Chattogram, Rajshahi,
Mymensingh, Khulna and Sylhet.

The whole interface is in Bangla, with Bengali numerals (`১,৮৫০ টাকা`), and is fully responsive.

## ✨ Key Features

1. **📈 Live price ticker & daily movers** — an infinite scrolling ticker under the navbar, plus
   "আজ দাম বেড়েছে ▲" and "আজ দাম কমেছে ▼" sections showing the top 6 risers and fallers.
2. **🗂️ Category browsing with smart sorting** — filter by category and sort by price
   (*ডিফল্ট / কম থেকে বেশি / বেশি থেকে কম*). Sorting uses the numeric value, never the Bengali text.
3. **🏪 Market-by-market price comparison** — each product page shows min / max / average price and
   a table of prices in 12 markets, cheapest first.
4. **🔐 Secure authentication** — email & password plus **Google** and **GitHub** login with
   BetterAuth running on Convex. Product details are a protected route that redirects guests to sign in
   and brings them back afterwards.
5. **👤 Profile & update information** — view account details and update your name on a dedicated page.
6. **⚡ Polished UX** — skeleton loaders, toast notifications for every auth action and validation
   error, friendly 404 / empty states, and a layout that works on mobile, tablet and desktop.

## 🧰 Technologies Used

| Purpose | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI 5](https://daisyui.com/) |
| Authentication | [BetterAuth](https://better-auth.com/) (email/password, Google, GitHub) |
| Backend & database | [Convex](https://convex.dev/) (BetterAuth runs inside Convex) |
| Notifications | react-hot-toast |
| Font | Hind Siliguri (Bangla) |
| Data | Bazardor REST API (`/categories`, `/products`) |
| Deployment | Vercel |

## 🗺️ Pages

| Route | Description | Access |
|---|---|---|
| `/` | Hero, top risers, top fallers, all products | Public |
| `/category/[slug]` | Products in a category, with sort control | Public |
| `/product/[slug]` | Price summary and market-wise price table | 🔒 Login required |
| `/signin`, `/signup` | Authentication | Public |
| `/profile` | Account details | 🔒 Login required |
| `/profile/update` | Update your name | 🔒 Login required |
| any other URL | Friendly 404 with a link back home | Public |

## 🚀 Getting Started

**Prerequisites:** Node.js 20+ and a free [Convex](https://convex.dev/) account.

```bash
# 1. Clone and install
git clone <your-repo-url>
cd bazardor
npm install

# 2. Connect Convex (creates .env.local and generates convex/_generated)
npx convex dev            # keep this running in its own terminal

# 3. Set the auth secrets in your Convex deployment (one time)
npx convex env set SITE_URL http://localhost:3000
npx convex env set BETTER_AUTH_SECRET "$(openssl rand -base64 32)"
npx convex env set GOOGLE_CLIENT_ID <id>        # optional: Google login
npx convex env set GOOGLE_CLIENT_SECRET <secret>
npx convex env set GITHUB_CLIENT_ID <id>        # optional: GitHub login
npx convex env set GITHUB_CLIENT_SECRET <secret>

# 4. Run the app (in a second terminal)
npm run dev               # http://localhost:3000
```

Other scripts: `npm run build` · `npm start` · `npm run lint`

### 🔑 Environment variables

**`.env.local`** (written by `npx convex dev`):

| Variable | Description |
|---|---|
| `CONVEX_DEPLOYMENT` | Your Convex deployment name |
| `NEXT_PUBLIC_CONVEX_URL` | Convex client URL (`*.convex.cloud`) |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | Convex HTTP/site URL (`*.convex.site`), where BetterAuth runs |

**Convex environment** (set with `npx convex env set`):

| Variable | Description |
|---|---|
| `SITE_URL` | Your app's URL: `http://localhost:3000` locally, the live URL in production |
| `BETTER_AUTH_SECRET` | Random secret, generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials *(optional)* |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials *(optional)* |

OAuth callback URLs: `<SITE_URL>/api/auth/callback/google` and `<SITE_URL>/api/auth/callback/github`.

> ⚠️ Never commit `.env.local`. It is already listed in `.gitignore`. Do commit `convex/_generated`.

## ☁️ Deployment (Vercel + Convex)

1. Deploy the backend to production: `npx convex deploy`. Note the production `*.convex.cloud` and `*.convex.site` URLs.
2. Set the Convex **production** environment variables (`SITE_URL` = your Vercel URL, `BETTER_AUTH_SECRET`, and the OAuth keys) in the Convex dashboard.
3. Push to GitHub and import the repo in Vercel. Add `NEXT_PUBLIC_CONVEX_URL` and `NEXT_PUBLIC_CONVEX_SITE_URL` (the production values).
4. Add the production callback URLs to your Google and GitHub OAuth apps, then redeploy.

Dynamic routes (`/category/[slug]`, `/product/[slug]`) are rendered on demand, so refreshing any
page works without a 404.

## 📁 Project Structure

```
src/
├── app/                 # Routes: home, category, product, signin, signup, profile, api/auth (proxy to Convex)
├── components/          # Navbar, Ticker, Hero, ProductCard, MarketTable, Footer, auth forms…
└── lib/                 # api.ts (data), auth-client.ts / auth-server.ts / session.ts, bn.ts (Bangla formatting)
convex/                  # Convex backend: auth.ts (BetterAuth), http.ts, auth.config.ts, convex.config.ts
```

## ⚠️ Disclaimer

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
*All prices are indicative and may vary with market conditions.*

---

<div align="center">Made with ❤️ for Assignment 07 · B14</div>
