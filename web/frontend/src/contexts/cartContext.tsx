import { createContext, useEffect, useState } from "react";
import { ICart, ICartItem } from "../common/model/cart.ts";
import { IProduct } from "../common/model/product.ts";
import React from "react";
import { CacheService } from "../common/cacheService.ts";

const cartKey = "Cart-Key-486587@wue";
const cartTotalKey = "Cart-Key-Total-486587@wue";
export const CartContext = createContext<ICart>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clear: () => {}
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const cacheService = new CacheService();
  const [items, setCartItems] = useState<ICartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  if (
    items &&
    items.length > 0 &&
    items.findIndex((x) => x.quantity <= 0) <0
  ) {
    cacheService.addData(items, cartKey);
  }

  const cachedData = cacheService.getData<ICartItem[]>(cartKey);
  if (cachedData && cachedData.length > 0 && items.length == 0) {
    setCartItems(cachedData);
  }
  const addItem = (product: IProduct) => {
    let newItems = items;
    const itemIndex = newItems.findIndex((x) => x.product?.id == product.id);
    if (itemIndex < 0)
      newItems.push({
        quantity: 1,
        product,
        total: product.price
      } as ICartItem);
    else {
      newItems[itemIndex].quantity += 1;
      newItems[itemIndex].total = newItems[itemIndex].quantity * product.price;
    }
    const filteredItems = newItems.filter((x) => x.quantity > 0);
    setCartItems(filteredItems);
    setTotalValue(filteredItems);
  };
  const clear = () => {
    const empty = [];
    setCartItems(empty);
    setTotal(0);
    cacheService.removeData(cartKey);
  };

  const removeItem = (product: IProduct) => {
    let newItems = [...items];
    const itemIndex = newItems.findIndex((x) => x.product?.id == product.id);
    if (itemIndex >= 0) {
      newItems[itemIndex].quantity -= 1;
      if (newItems[itemIndex].quantity > 0)
        newItems[itemIndex].total =
          newItems[itemIndex].quantity * newItems[itemIndex].product!.price;
    }
    const filteredItems = newItems.filter((x) => x.quantity > 0);
    setCartItems(filteredItems);
    setTotalValue(filteredItems);
  };

  function setTotalValue(cartItems: ICartItem[]) {
    const total = cartItems.reduce((accumulator, item) => {
      return accumulator + item.total;
    }, 0);
    setTotal(total);
    cacheService.addData<ICartItem[]>(cartItems, cartKey);
  }

  // You can implement removeFromCart, clearCart, etc.

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
};
