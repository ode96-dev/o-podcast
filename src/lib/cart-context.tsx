"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CartItem, Product } from "@/types/podcast";
import { PRODUCTS } from "@/lib/data";

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  addToCart: (
    product: Product,
    quantity?: number,
    size?: string,
    color?: string,
  ) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedSize: "L",
      selectedColor: "Charcoal Ink",
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const freeShippingThreshold = 100;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const addToCart = useCallback(
    (product: Product, quantity = 1, size?: string, color?: string) => {
      setCart((prev) => {
        const resolvedSize = size || product.sizes?.[0];
        const resolvedColor = color || product.colors?.[0]?.name;
        const existingIdx = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === resolvedSize &&
            item.selectedColor === resolvedColor,
        );

        if (existingIdx > -1) {
          const next = [...prev];
          next[existingIdx] = {
            ...next[existingIdx],
            quantity: next[existingIdx].quantity + quantity,
          };
          return next;
        }

        return [
          ...prev,
          {
            product,
            quantity,
            selectedSize: resolvedSize,
            selectedColor: resolvedColor,
          },
        ];
      });
      setIsCartOpen(true);
    },
    [],
  );

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  }, []);

  const updateQuantity = useCallback(
    (index: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(index);
        return;
      }
      setCart((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], quantity };
        return next;
      });
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((p) => !p), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        totalItems,
        subtotal,
        freeShippingThreshold,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
