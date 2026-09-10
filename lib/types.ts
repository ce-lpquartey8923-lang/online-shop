export type Category = "All" | "New arrivals" | "Apparel" | "Home" | "Accessories";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: Exclude<Category, "All">;
  image: string;
  gallery: string[];
  colors: string[];
  sizes?: string[];
  material: string;
  featured?: boolean;
  badge?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};
