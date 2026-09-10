"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem, Product } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, options?: { size?: string; color?: string }) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
};
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const stored = window.localStorage.getItem("luma-cart");
    if (stored) setItems(JSON.parse(stored) as CartItem[]);
  }, []);
  useEffect(() => { window.localStorage.setItem("luma-cart", JSON.stringify(items)); }, [items]);
  const value = useMemo(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    addItem: (product: Product, options: { size?: string; color?: string } = {}) => setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id && item.size === options.size);
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { product, quantity: 1, ...options }];
    }),
    removeItem: (productId: string, size?: string) => setItems((current) => current.filter((item) => !(item.product.id === productId && item.size === size))),
    updateQuantity: (productId: string, quantity: number, size?: string) => setItems((current) => current.map((item) => item.product.id === productId && item.size === size ? { ...item, quantity: Math.max(1, quantity) } : item)),
    clearCart: () => setItems([])
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
