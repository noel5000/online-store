export interface IProduct {
  id: number;
  name: string;
  description?: string | undefined;
  pictureUrl?: string | undefined;
  price: number;
  isSubscription: boolean;
  quantity: number;
  category?: string | undefined;
}
