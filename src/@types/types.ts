import { IProduct } from "./products";


export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  hobbies: string[];
  age: number;
}

export interface IUser {
  id: string; // UUID as a string
  role: string;
  email: string; // Unique email
  password?: string; // Optional field
  businessName?: string; // Optional field
  phoneNumber: number; // Phone number as an integer
  whatsappLink?: string; // Optional field
  instagramLink?: string; // Optional field
  twitterLink?: string; // Optional field
  fullName: string; // Required field
  profilePicture?: string; // Optional field
  isGoogleAuth: boolean; // Required field
  createdAt: Date; // Date created
  updatedAt: Date; // Date updated
  products?: IProduct[]; // Array of associated products
}

// Assuming you have a Product interface as well
