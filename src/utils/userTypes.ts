export type userMailAccount = {
  name: string;
  email: string;
  password: string;
}

export type loggedUser = {
  name: string;
  email: string;
  role: string;
  id: string;
}

export interface User{
  name: string;
  email: string;
  role: string;
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
