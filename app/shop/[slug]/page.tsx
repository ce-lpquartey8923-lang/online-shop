import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, Truck } from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/data";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";

export async function generateStaticParams() { return (await getProducts()).map((product) => ({ slug: product.slug })); }
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();
  const related = (await getProducts()).filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  return <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10 lg:py-16"><Link href="/shop" className="mb-8 inline-flex items-center gap-2 text-xs text-ink/60 hover:text-ink"><ArrowLeft size={14} /> Back to collection</Link><div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-20"><div className="grid grid-cols-2 gap-3">{product.gallery.map((src, index) => <div key={src} className={`relative aspect-[4/5] overflow-hidden bg-sage ${index === 0 ? "col-span-2" : ""}`}><Image src={src} alt={`${product.name} view ${index + 1}`} fill priority={index === 0} sizes={index === 0 ? "(max-width: 768px) 90vw, 55vw" : "30vw"} className="object-cover" /></div>)}</div><div className="lg:sticky lg:top-28 lg:h-fit"><p className="text-xs font-semibold uppercase tracking-[.2em] text-coral">{product.category}</p><h1 className="mt-4 font-display text-5xl leading-tight">{product.name}</h1><div className="mt-5 flex items-center gap-3"><p className="text-lg">${product.price}</p>{product.compareAtPrice && <p className="text-sm text-ink/40 line-through">${product.compareAtPrice}</p>}</div><p className="mt-7 text-sm leading-7 text-ink/65">{product.description}</p><div className="my-8 border-t border-ink/10 pt-7"><AddToCart product={product} /></div><div className="space-y-4 border-t border-ink/10 pt-6 text-sm"><div className="flex gap-3"><Truck size={18} strokeWidth={1.5} /><div><p className="font-medium">Free shipping over $100</p><p className="mt-1 text-xs text-ink/55">Usually arrives in 3–5 business days.</p></div></div><div className="flex gap-3"><Heart size={18} strokeWidth={1.5} /><div><p className="font-medium">Made to be lived in</p><p className="mt-1 text-xs text-ink/55">{product.material}</p></div></div></div></div></div>{related.length > 0 && <section className="mt-24 border-t border-ink/10 pt-12"><h2 className="font-display text-3xl">You may also like</h2><div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}</div>;
}
