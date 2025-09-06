
export enum Category {
  ELECTRONICS = "Electronics",
  FASHION = "Fashion",
  HOME_GARDEN = "Home & Garden",
  BOOKS_MEDIA = "Books & Media",
  COLLECTIBLES_ART = "Collectibles & Art",
  HOBBIES = "Hobbies",
}

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // Optional for security simulation
  image: string;
  address?: string;
  age?: number;
  contactNumber?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  imageUrls: string[];
  sellerId: string;
  // New fields based on the wireframe
  quantity: number;
  condition: string; // e.g., "New", "Used - Like New", "Used - Good"
  yearOfManufacture?: number;
  brand: string;
  model: string;
  dimensions: string; // e.g., "10cm x 5cm x 2cm"
  weight: string; // e.g., "250g"
  material: string;
  color: string;
  originalPackaging: boolean;
  manualIncluded: boolean;
  workingCondition: string;
}

export type Cart = {
  [productId: string]: number; // productId: quantity
};

export interface Order {
    id: string;
    userId: string;
    date: string;
    items: Cart;
}

export type LoginResult = 'SUCCESS' | 'USER_NOT_FOUND' | 'INVALID_PASSWORD';
export type SignUpResult = 'SUCCESS' | 'EMAIL_EXISTS';

export type Page = 
  | { name: 'LOGIN' }
  | { name: 'HOME' }
  | { name: 'PRODUCT_DETAIL', productId: string }
  | { name: 'MY_LISTINGS' }
  | { name: 'ADD_PRODUCT' }
  | { name: 'EDIT_PRODUCT', productId: string }
  | { name: 'DASHBOARD' }
  | { name: 'CART' }
  | { name: 'ORDERS' }
  | { name: 'USER_DETAILS' }
  | { name: 'ABOUT' }
  | { name: 'CONTACT' };