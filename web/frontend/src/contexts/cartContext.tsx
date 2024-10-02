import { createContext, useEffect, useState } from "react";
import { ICart, ICartItem } from "../common/model/cart.ts";
import { IProduct } from "../common/model/product.ts";
import React from "react";
import { CacheService } from "../common/cacheService.ts";

const cartKey = "Cart-Key-486587@wue";
export const CartContext = createContext<ICart>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  total: 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cacheService = new CacheService();
  const [items, setCartItems] = useState<ICartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  if (items && items.length > 0) {
    cacheService.addData(items, cartKey);
  }
  const cachedData = cacheService.getData<ICartItem[]>(cartKey);
  if (cachedData && cachedData.length > 0 && items.length == 0) {
    setCartItems(cachedData);
  }
  const addItem = (product: IProduct) => {
    setCartItems((prevItems) => {
      // Check if item is already in the cart
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        // Increase quantity
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { product, quantity: 1, total: product.price }];
      }
    });
    setTotalValue();
  };

  const removeItem = (product: IProduct) => {
    setCartItems((prevItems) => {
      // Check if item is already in the cart
      const index = prevItems.findIndex(
        (item) => item.product.id === product.id && item.quantity > 0
      );
      if (index >= 0) {
        // Increase quantity
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Add new item
        return [...prevItems.filter((x) => x.quantity > 0)];
      }
    });
    setTotalValue();
  };

  function setTotalValue() {
    const filtered = items.filter((x) => x.quantity > 0);
    setTotal(
      filtered.reduce((accumulator, item) => {
        return accumulator + item.total;
      }, 0)
    );
    cacheService.addData<ICartItem[]>(items, cartKey);
  }

  // You can implement removeFromCart, clearCart, etc.

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, total }}>
      {children}
    </CartContext.Provider>
  );
};
