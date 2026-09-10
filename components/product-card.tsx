import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return <Link href={`/shop/${product.slug}`} className="group">
    <div className="relative aspect-[4/5] overflow-hidden bg-sage">
      {product.badge && <span className="absolute left-3 top-3 z-10 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[.15em]">{product.badge}</span>}
      <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
    </div>
    <div className="flex items-start justify-between gap-3 pt-4"><div><p className="text-sm font-medium">{product.name}</p><p className="mt-1 text-xs text-ink/50">{product.category}</p></div><p className="text-sm">${product.price}</p></div>
  </Link>;
}
