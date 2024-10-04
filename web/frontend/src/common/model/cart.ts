import { IProduct } from "./product";

export interface ICart {
  items: ICartItem[];
  addItem(product: IProduct);
  removeItem(product: IProduct);
  clear();
}

export interface ICartItem {
  quantity: number;
  product: IProduct | null;
  total: number;
  productId: number | 0;
}
