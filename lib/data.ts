import { products } from "./mock-data";
import { supabase } from "./supabase";
import { Product } from "./types";

export async function getProducts(): Promise<Product[]> {
  if (!supabase) return products;
  const { data, error } = await supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false });
  if (error || !data?.length) return products;
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!supabase) return products.find((product) => product.slug === slug);
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  if (error || !data) return products.find((product) => product.slug === slug);
  return data as Product;
}
