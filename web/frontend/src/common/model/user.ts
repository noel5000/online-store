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
