import Navbar from "./Navbar";
import Ticker from "./Ticker";
import { getCategories, getProducts } from "@/lib/api";
import { getSessionUser } from "@/lib/session";

export default async function Header() {
  const [categories, products, user] = await Promise.all([
    getCategories(),
    getProducts(),
    getSessionUser(),
  ]);

  return (
    <>
      <Navbar categories={categories} user={user} />
      <Ticker products={products} />
    </>
  );
}
