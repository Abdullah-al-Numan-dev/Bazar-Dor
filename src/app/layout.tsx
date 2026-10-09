import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "প্রতিদিনের বাজারদর, দাম বাড়া-কমার খবর এক জায়গায়।",
  icons: { icon: "/logo-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="bazardor" className={hind.variable}>
      <body className="min-h-screen antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
