"use client";

import Link from "next/link";
import { Search, ShoppingBag, UserRound, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "./cart-provider";

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-[#fcfbf8]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X size={22} /> : <Menu size={22} />}</button>
        <Link href="/" className="font-display text-3xl tracking-tight lg:mr-16">luma<span className="text-coral">.</span></Link>
        <nav className={`${open ? "absolute left-0 top-20 flex" : "hidden"} w-full flex-col gap-5 border-b border-ink/10 bg-[#fcfbf8] p-5 lg:static lg:flex lg:w-auto lg:flex-row lg:border-0 lg:bg-transparent lg:p-0`}>
          <Link onClick={() => setOpen(false)} href="/shop" className="text-sm hover:text-moss">Shop all</Link>
          <Link onClick={() => setOpen(false)} href="/shop?category=New%20arrivals" className="text-sm hover:text-moss">New arrivals</Link>
          <Link onClick={() => setOpen(false)} href="/shop?category=Home" className="text-sm hover:text-moss">Home</Link>
          <Link onClick={() => setOpen(false)} href="/shop?category=Apparel" className="text-sm hover:text-moss">Wardrobe</Link>
        </nav>
        <div className="flex items-center gap-4 lg:ml-auto">
          <Link href="/shop" aria-label="Search"><Search size={20} strokeWidth={1.7} /></Link>
          <Link href="/account" aria-label="Account" className="hidden sm:block"><UserRound size={20} strokeWidth={1.7} /></Link>
          <Link href="/cart" className="relative" aria-label="Shopping bag"><ShoppingBag size={20} strokeWidth={1.7} />{count > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[10px] font-semibold text-white">{count}</span>}</Link>
        </div>
      </div>
    </header>
  );
}
