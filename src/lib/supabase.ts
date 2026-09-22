import { createClient } from '@supabase/supabase-js'
import type { Product } from '../types'
export const isSupabaseConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
export type Database = {
  public: {
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
    Tables: {
      products: { Row: { id:string; slug:string; name:string; category_id:string|null; price:number; description:string; image_url:string; details:string[]; badge:string|null; created_at:string }; Insert: Omit<Database['public']['Tables']['products']['Row'],'id'|'created_at'> & { id?:string; created_at?:string }; Update: Partial<Database['public']['Tables']['products']['Insert']>; Relationships: [] }
      categories: { Row: { id:string; name:string; slug:string }; Insert: { id?:string; name:string; slug:string }; Update: Partial<Database['public']['Tables']['categories']['Insert']>; Relationships: [] }
      profiles: { Row: { id:string; full_name:string|null; email:string|null; created_at:string }; Insert: { id:string; full_name?:string|null; email?:string|null }; Update: Partial<Database['public']['Tables']['profiles']['Insert']>; Relationships: [] }
      orders: { Row: { id:string; user_id:string|null; status:string; total:number; shipping_address:Record<string,string>|null; created_at:string }; Insert: Omit<Database['public']['Tables']['orders']['Row'],'id'|'created_at'> & { id?:string; created_at?:string }; Update: Partial<Database['public']['Tables']['orders']['Insert']>; Relationships: [] }
      order_items: { Row: { id:string; order_id:string; product_id:string|null; quantity:number; unit_price:number }; Insert: Omit<Database['public']['Tables']['order_items']['Row'],'id'> & { id?:string }; Update: Partial<Database['public']['Tables']['order_items']['Insert']>; Relationships: [] }
    }
  }
}
export const supabase = isSupabaseConfigured
  ? createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
  : null

export async function fetchProducts(): Promise<{ data: Product[] | null; error: Error | null }> {
  if (!supabase) {
    return {
      data: null,
      error: new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.'),
    }
  }
  const [productResult, categoryResult] = await Promise.all([
    supabase.from('products').select('*').order('created_at', { ascending: false }),
    supabase.from('categories').select('id, name'),
  ])
  if (productResult.error) return { data: null, error: productResult.error }
  if (categoryResult.error) return { data: null, error: categoryResult.error }
  const categories = new Map(categoryResult.data.map(category => [category.id, category.name]))
  return {
    data: productResult.data.map(product => ({
      id: product.slug,
      name: product.name,
      category: (categories.get(product.category_id ?? '') ?? 'Objects') as Product['category'],
      price: Number(product.price),
      description: product.description,
      image: product.image_url,
      badge: product.badge ?? undefined,
      details: product.details,
    })),
    error: null,
  }
}
