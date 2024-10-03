import { IProduct } from "./product";

export interface ICart {
  items: ICartItem[];
  addItem(product: IProduct);
  removeItem(product: IProduct);
}

export interface ICartItem {
  quantity: number;
  product: IProduct;
  total: number;
}
