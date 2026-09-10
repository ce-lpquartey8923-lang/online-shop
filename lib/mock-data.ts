import { Product } from "./types";

const image = (id: string, width = 900, height = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const products: Product[] = [
  {
    id: "linen-set",
    name: "Linen lounge set",
    slug: "linen-lounge-set",
    description: "A breathable two-piece made for slow mornings and sunny afternoons. Cut from washed European linen with an easy, relaxed drape.",
    price: 148,
    category: "Apparel",
    image: image("photo-1490481651871-ab68de25d43d"),
    gallery: [image("photo-1490481651871-ab68de25d43d"), image("photo-1515886657613-9f3515b0c78f"), image("photo-1483985988355-763728e1935b")],
    colors: ["Natural", "Sage"],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "100% European linen",
    featured: true,
    badge: "Bestseller"
  },
  {
    id: "arc-vase",
    name: "Arc ceramic vase",
    slug: "arc-ceramic-vase",
    description: "Sculptural and softly matte, the Arc vase adds a quiet focal point to an entry table, bookshelf, or bedside.",
    price: 72,
    category: "Home",
    image: image("photo-1612196808214-b8e1d6145a8c"),
    gallery: [image("photo-1612196808214-b8e1d6145a8c"), image("photo-1610701596007-11502861dcfa"), image("photo-1618220179428-22790b461013")],
    colors: ["Oat", "Charcoal"],
    material: "Hand-finished stoneware",
    featured: true,
    badge: "New"
  },
  {
    id: "everyday-tote",
    name: "Everyday leather tote",
    slug: "everyday-leather-tote",
    description: "A roomy, structured carryall that gets better with every trip. Finished with a magnetic closure and an interior pocket.",
    price: 189,
    category: "Accessories",
    image: image("photo-1553062407-98eeb64c6a62"),
    gallery: [image("photo-1553062407-98eeb64c6a62"), image("photo-1548036328-c9fa89d128fa"), image("photo-1594223274512-ad4803739b7c")],
    colors: ["Cognac", "Black"],
    material: "Full-grain vegetable-tanned leather",
    featured: true
  },
  {
    id: "ribbed-knit",
    name: "Ribbed knit cardigan",
    slug: "ribbed-knit-cardigan",
    description: "An oversized layer with a softly structured shoulder and substantial rib knit. Your new between-season essential.",
    price: 124,
    compareAtPrice: 160,
    category: "New arrivals",
    image: image("photo-1551488831-00ddcb6c6bd3"),
    gallery: [image("photo-1551488831-00ddcb6c6bd3"), image("photo-1485968579580-b6d095142e6e")],
    colors: ["Cream", "Rust"],
    sizes: ["XS", "S", "M", "L"],
    material: "70% organic cotton, 30% recycled wool",
    badge: "Limited"
  },
  {
    id: "weekend-candle",
    name: "Weekend candle",
    slug: "weekend-candle",
    description: "Notes of cedar, bergamot, and sun-warmed skin. Poured in small batches for a gentle, 45-hour burn.",
    price: 38,
    category: "Home",
    image: image("photo-1603006905003-be475563bc59"),
    gallery: [image("photo-1603006905003-be475563bc59"), image("photo-1602874801006-e26a63e9b6bd")],
    colors: ["Amber"],
    material: "Soy wax, cotton wick",
    featured: true
  },
  {
    id: "shell-stud-earrings",
    name: "Shell stud earrings",
    slug: "shell-stud-earrings",
    description: "Tiny freshwater pearls set in recycled sterling silver. A simple glimmer for every day.",
    price: 54,
    category: "Accessories",
    image: image("photo-1535632066927-ab7c9ab60908"),
    gallery: [image("photo-1535632066927-ab7c9ab60908"), image("photo-1611652022419-a9419f74343d")],
    colors: ["Silver"],
    material: "Freshwater pearl, recycled sterling silver"
  },
  {
    id: "canvas-overshirt",
    name: "Canvas overshirt",
    slug: "canvas-overshirt",
    description: "Utility-inspired and cut for layering, this soft canvas overshirt brings a little structure to casual days.",
    price: 112,
    category: "Apparel",
    image: image("photo-1591047139829-d91aecb6caea"),
    gallery: [image("photo-1591047139829-d91aecb6caea"), image("photo-1551488831-00ddcb6c6bd3")],
    colors: ["Olive", "Stone"],
    sizes: ["S", "M", "L", "XL"],
    material: "Organic cotton canvas"
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
