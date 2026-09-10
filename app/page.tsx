import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export default async function Home() {
  const products = await getProducts();
  return <>
    <section className="relative overflow-hidden bg-sage">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-10 lg:py-20">
        <div className="relative z-10 max-w-xl"><p className="mb-6 text-xs font-semibold uppercase tracking-[.25em] text-moss">The autumn edit · 2024</p><h1 className="font-display text-6xl leading-[.95] tracking-tight md:text-8xl">The beauty of <em className="text-moss">enough.</em></h1><p className="mt-8 max-w-sm text-base leading-7 text-ink/65">A small, thoughtful collection for home, wardrobe, and everywhere in between.</p><Link href="/shop" className="mt-9 inline-flex items-center gap-3 bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-moss">Shop the collection <ArrowRight size={16} /></Link></div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md rotate-2 overflow-hidden bg-[#b9cdbd]"><Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85" alt="Person wearing a linen outfit" fill priority sizes="(max-width: 768px) 90vw, 40vw" className="object-cover" /><div className="absolute bottom-5 left-5 bg-white/90 px-4 py-3 text-xs">01 / 04 &nbsp; <span className="text-ink/50">A slower way to dress</span></div></div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10"><div className="mb-10 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-coral">Just in</p><h2 className="mt-3 font-display text-4xl">Fresh perspectives</h2></div><Link href="/shop" className="hidden items-center gap-2 text-sm underline underline-offset-4 sm:flex">View all <ArrowUpRight size={15} /></Link></div><div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">{products.filter((product) => product.featured).slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    <section className="grain bg-[#f0ebe2]"><div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:px-10"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-coral">Our point of view</p><h2 className="mt-4 max-w-lg font-display text-5xl leading-tight">Less, but better.</h2><p className="mt-6 max-w-md text-sm leading-7 text-ink/65">We believe the things we live with should earn their place. Every Luma piece is selected for its materials, its makers, and the way it feels to use every day.</p><Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">Read our story <ArrowRight size={15} /></Link></div><div className="relative aspect-square overflow-hidden"><Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85" alt="Warm, considered home interior" fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover" /></div></div></section>
  </>;
}
