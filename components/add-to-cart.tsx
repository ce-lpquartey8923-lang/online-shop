"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "./cart-provider";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes?.[1] || "");
  const [color, setColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const handleAdd = () => { addItem(product, { size, color }); setAdded(true); window.setTimeout(() => setAdded(false), 1800); };
  return <div className="space-y-7">
    {product.colors.length > 1 && <div><p className="mb-3 text-xs font-semibold uppercase tracking-[.16em]">Color: <span className="font-normal normal-case tracking-normal text-ink/60">{color}</span></p><div className="flex gap-2">{product.colors.map((item) => <button key={item} onClick={() => setColor(item)} className={`border px-4 py-2 text-sm ${color === item ? "border-ink bg-ink text-white" : "border-ink/20"}`}>{item}</button>)}</div></div>}
    {product.sizes && <div><p className="mb-3 text-xs font-semibold uppercase tracking-[.16em]">Size</p><div className="grid grid-cols-5 gap-2">{product.sizes.map((item) => <button key={item} onClick={() => setSize(item)} className={`border py-2 text-sm ${size === item ? "border-ink bg-ink text-white" : "border-ink/20"}`}>{item}</button>)}</div></div>}
    <button onClick={handleAdd} className="flex w-full items-center justify-center gap-3 bg-moss py-4 text-sm font-semibold text-white transition hover:bg-ink">{added ? <><Check size={18} /> Added to bag</> : <><ShoppingBag size={18} /> Add to bag</>}</button>
  </div>;
}
