export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  permissions: string[] | [];
  address?: string | null;
  language: string | "EN";
  authToken: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface IRegisterUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  address: string;
  address2?: string | null;
  zipCode: string;
  shippingIsBilling: boolean;
}
