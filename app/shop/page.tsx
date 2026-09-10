import { getProducts } from "@/lib/data";
import { ShopBrowser } from "@/components/shop-browser";
import { Category } from "@/lib/types";

export default async function Shop({ searchParams }: { searchParams: { category?: string } }) {
  const products = await getProducts();
  const categories: Category[] = ["All", "New arrivals", "Apparel", "Home", "Accessories"];
  const initialCategory = categories.includes(searchParams.category as Category) ? searchParams.category as Category : "All";
  return <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20"><div className="mb-12 max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-coral">The collection</p><h1 className="mt-4 font-display text-6xl tracking-tight">Good things, <em>well made.</em></h1><p className="mt-5 max-w-lg text-sm leading-7 text-ink/60">Objects and essentials chosen for their quiet confidence, honest materials, and long lives.</p></div><ShopBrowser products={products} initialCategory={initialCategory} /></div>;
}
