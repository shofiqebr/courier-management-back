// src/modules/user/user.interface.ts

export type UserRole = 'admin' | 'agent' | 'customer';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  location?: {
    lat: number;
    lng: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
