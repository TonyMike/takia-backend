export interface IProduct {
  id: string; // Product ID
  title: string;
  description: string;
  negotiable: boolean;
  condition: string;
  category: string;
  subCategory: string;
  state: string;
  school: string;
  images: string; // Assuming images are stored as a string (could be an array of URLs)
  price: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string; // Foreign key reference to User
}
