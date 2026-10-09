import Navbar, { type NavUser } from "./Navbar";
import Ticker from "./Ticker";
import { getCategories, getProducts } from "@/lib/api";

export default async function Header() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  // TODO(BetterAuth): read the session here and pass the real user.
  const user: NavUser = null;

  return (
    <>
      <Navbar categories={categories} user={user} />
      <Ticker products={products} />
    </>
  );
}
