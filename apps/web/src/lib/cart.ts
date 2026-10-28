"use client";

import { useState, useEffect } from "react";

export interface CartItem {
  sku_id: string;
  product_id: string;
  product_slug: string;
  product_name: string;
  sku_code: string;
  sku_title: string;
  price_inr: number;
  tax_rate_percent: number;
  image_url: string;
  quantity: number;
  max_stock: number;
}

const CART_STORAGE_KEY = "smps_cart_v1";

export function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("smps-cart-updated"));
  } catch {
    // LocalStorage quota or privacy mode error
  }
}

export function addToCart(item: CartItem): void {
  const current = getStoredCart();
  const existingIndex = current.findIndex((i) => i.sku_id === item.sku_id);

  if (existingIndex > -1) {
    const newQty = Math.min(
      item.max_stock || 99,
      current[existingIndex].quantity + item.quantity
    );
    current[existingIndex].quantity = newQty;
  } else {
    current.push(item);
  }

  saveStoredCart(current);
}

export function updateCartQuantity(sku_id: string, newQty: number): void {
  const current = getStoredCart();
  const item = current.find((i) => i.sku_id === sku_id);
  if (item) {
    item.quantity = Math.max(1, Math.min(item.max_stock || 99, newQty));
    saveStoredCart(current);
  }
}

export function removeFromCart(sku_id: string): void {
  const current = getStoredCart().filter((i) => i.sku_id !== sku_id);
  saveStoredCart(current);
}

export function clearCart(): void {
  saveStoredCart([]);
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(getStoredCart());

    const handleUpdate = () => {
      setItems(getStoredCart());
    };

    window.addEventListener("smps-cart-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("smps-cart-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price_inr * item.quantity,
    0
  );
  const taxAmount = items.reduce(
    (sum, item) =>
      sum +
      Math.round(item.price_inr * item.quantity * (item.tax_rate_percent / 100)),
    0
  );
  const shippingFee = subtotal >= 2000 || items.length === 0 ? 0 : 150;
  const grandTotal = subtotal + taxAmount + shippingFee;

  return {
    items,
    mounted,
    totalCount,
    subtotal,
    taxAmount,
    shippingFee,
    grandTotal,
    updateQuantity: updateCartQuantity,
    removeItem: removeFromCart,
    clear: clearCart,
  };
}
