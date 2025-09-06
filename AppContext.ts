
import { createContext } from 'react';
import type { User, Product, Cart, Order, Page, LoginResult, SignUpResult } from '../types';

interface AppContextType {
    users: User[];
    products: Product[];
    currentUser: User | null;
    cart: Cart;
    orders: Order[];
    navigate: (page: Page) => void;
    login: (email: string, pass: string) => LoginResult;
    signUp: (username: string, email: string, pass: string) => SignUpResult;
    logout: () => void;
    updateUser: (user: User) => void;
    addProduct: (product: Omit<Product, 'id' | 'sellerId'>) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (productId: string) => void;
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    checkout: () => void;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);