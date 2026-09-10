"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Product, Category } from "@/lib/types";
import { ProductCard } from "./product-card";

export function ShopBrowser({ products, initialCategory = "All" }: { products: Product[]; initialCategory?: Category }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>(initialCategory);
  const categories: Category[] = ["All", "New arrivals", "Apparel", "Home", "Accessories"];
  const filtered = useMemo(() => products.filter((product) => (category === "All" || product.category === category) && `${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase())), [products, category, query]);
  return <div>
    <div className="flex flex-col gap-5 border-y border-ink/10 py-5 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-5 overflow-x-auto text-sm">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap ${category === item ? "font-semibold underline decoration-coral decoration-2 underline-offset-8" : "text-ink/50 hover:text-ink"}`}>{item}</button>)}</div>
      <label className="flex items-center gap-2 border-b border-ink/20 pb-2 text-sm md:w-56"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pieces" className="w-full bg-transparent outline-none placeholder:text-ink/40" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>}</label>
    </div>
    <div className="mb-6 mt-8 flex items-center justify-between text-xs text-ink/50"><p>{filtered.length} {filtered.length === 1 ? "piece" : "pieces"}</p><button className="flex items-center gap-2 md:hidden"><SlidersHorizontal size={15} /> Filter</button></div>
    {filtered.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-2xl bg-sage/50 px-6 py-20 text-center"><p className="font-display text-3xl">Nothing found</p><p className="mt-2 text-sm text-ink/60">Try a different search or browse another category.</p></div>}
  </div>;
}
