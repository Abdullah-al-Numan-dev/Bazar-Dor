<div align="center">

# 🛒 বাজার দর — BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**
*Daily essential-goods prices across Bangladesh's markets, at a glance.*

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![BetterAuth](https://img.shields.io/badge/BetterAuth-MongoDB-05893E)

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
   BetterAuth and MongoDB. Product details are a protected route that redirects guests to sign in
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
| Database | MongoDB Atlas |
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

**Prerequisites:** Node.js 20+ and a MongoDB database (e.g. a free Atlas cluster).

```bash
# 1. Clone and install
git clone <your-repo-url>
cd bazardor
npm install

# 2. Configure environment variables
cp .env.example .env.local     # then fill in the values (see below)

# 3. Run the dev server
npm run dev                    # http://localhost:3000
```

Other scripts: `npm run build` · `npm start` · `npm run lint`

### 🔑 Environment variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DB` | Database name (default `bazardor`) |
| `BETTER_AUTH_SECRET` | Random secret — generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | App URL: `http://localhost:3000` locally, your live URL in production |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials *(optional)* |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials *(optional)* |

OAuth callback URLs: `<BETTER_AUTH_URL>/api/auth/callback/google` and
`<BETTER_AUTH_URL>/api/auth/callback/github`.

> ⚠️ Never commit `.env.local`. It is already listed in `.gitignore`.

## ☁️ Deployment (Vercel)

1. Push the repository to GitHub and import it in Vercel.
2. Add all the environment variables above (set `BETTER_AUTH_URL` to the deployed URL).
3. In MongoDB Atlas → *Network Access*, allow Vercel's connections (e.g. `0.0.0.0/0`).
4. Add the production callback URLs to your Google and GitHub OAuth apps, then redeploy.

Dynamic routes (`/category/[slug]`, `/product/[slug]`) are rendered on demand, so refreshing any
page works without a 404.

## 📁 Project Structure

```
src/
├── app/                 # Routes: home, category, product, signin, signup, profile, api/auth
├── components/          # Navbar, Ticker, Hero, ProductCard, MarketTable, Footer, auth forms…
└── lib/                 # api.ts (data), auth.ts / auth-client.ts (BetterAuth), bn.ts (Bangla formatting)
```

## ⚠️ Disclaimer

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
*All prices are indicative and may vary with market conditions.*

---

<div align="center">Made with ❤️ for Assignment 07 · B14</div>
