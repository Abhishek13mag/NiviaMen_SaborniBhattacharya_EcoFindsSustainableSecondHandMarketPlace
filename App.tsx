
import React, { useState, useCallback, useMemo } from 'react';
import { AppContext } from './contexts/AppContext';
import type { User, Product, Cart, Order, Page, LoginResult, SignUpResult } from './types';
import { INITIAL_PRODUCTS, INITIAL_USERS } from './constants';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import ProductDetailScreen from './screens/ProductDetailScreen';
import MyListingsScreen from './screens/MyListingsScreen';
import AddEditProductScreen from './screens/AddEditProductScreen';
import DashboardScreen from './screens/DashboardScreen';
import CartScreen from './screens/CartScreen';
import OrdersScreen from './screens/OrdersScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState<Page>({ name: 'HOME' });
    const [cart, setCart] = useState<Cart>({});
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useCallback((page: Page) => {
        setCurrentPage(page);
    }, []);

    const handleLogin = useCallback((email: string, pass: string): LoginResult => {
        const user = users.find(u => u.email === email);
        if (!user) {
            return 'USER_NOT_FOUND';
        }
        if (user.password !== pass) { // Simulating password check
            return 'INVALID_PASSWORD';
        }
        
        setCurrentUser(user);
        setCart({});
        navigate({ name: 'HOME' });
        return 'SUCCESS';
    }, [users, navigate]);
    
    const handleSignUp = useCallback((username: string, email: string, pass: string): SignUpResult => {
        if (users.some(u => u.email === email)) {
            return 'EMAIL_EXISTS';
        }
        const newUser: User = { id: `user-${Date.now()}`, username, email, password: pass, image: `https://picsum.photos/seed/${Date.now()}/200` };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        setCart({});
        navigate({ name: 'USER_DETAILS' });
        return 'SUCCESS';
    }, [users, navigate]);

    const handleLogout = useCallback(() => {
        setCurrentUser(null);
        navigate({ name: 'HOME' });
    }, [navigate]);

    const updateUser = useCallback((updatedUser: User) => {
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    }, []);

    const addProduct = useCallback((product: Omit<Product, 'id' | 'sellerId'>) => {
        if (!currentUser) return;
        const newProduct: Product = {
            ...product,
            id: `prod-${Date.now()}`,
            sellerId: currentUser.id,
        };
        setProducts(prev => [newProduct, ...prev]);
        navigate({ name: 'MY_LISTINGS' });
    }, [currentUser, navigate]);

    const updateProduct = useCallback((updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        navigate({ name: 'MY_LISTINGS' });
    }, [navigate]);

    const deleteProduct = useCallback((productId: string) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    }, []);

    const addToCart = useCallback((productId: string) => {
        setCart(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1
        }));
    }, []);
    
    const removeFromCart = useCallback((productId: string) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[productId] > 1) {
                newCart[productId] -= 1;
            } else {
                delete newCart[productId];
            }
            return newCart;
        });
    }, []);

    const clearCart = useCallback(() => {
        setCart({});
    }, []);
    
    const checkout = useCallback(() => {
        if(!currentUser) return;
        const newOrder: Order = {
            id: `order-${Date.now()}`,
            userId: currentUser.id,
            date: new Date().toISOString(),
            items: { ...cart }
        };
        setOrders(prev => [newOrder, ...prev]);
        setCart({});
        navigate({ name: 'ORDERS' });
    }, [cart, currentUser, navigate]);

    const contextValue = useMemo(() => ({
        users,
        products,
        currentUser,
        cart,
        orders,
        navigate,
        login: handleLogin,
        signUp: handleSignUp,
        logout: handleLogout,
        updateUser,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        searchTerm,
        setSearchTerm,
    }), [users, products, currentUser, cart, orders, navigate, handleLogin, handleSignUp, handleLogout, updateUser, addProduct, updateProduct, deleteProduct, addToCart, removeFromCart, clearCart, checkout, searchTerm, setSearchTerm]);

    const renderPage = () => {
        switch (currentPage.name) {
            case 'LOGIN': return <LoginScreen />;
            case 'HOME': return <HomeScreen />;
            case 'PRODUCT_DETAIL': return <ProductDetailScreen productId={currentPage.productId!} />;
            case 'MY_LISTINGS': return <MyListingsScreen />;
            case 'ADD_PRODUCT': return <AddEditProductScreen />;
            case 'EDIT_PRODUCT': return <AddEditProductScreen productId={currentPage.productId!} />;
            case 'DASHBOARD': return <DashboardScreen />;
            case 'CART': return <CartScreen />;
            case 'ORDERS': return <OrdersScreen />;
            case 'USER_DETAILS': return <UserDetailsScreen />;
            case 'ABOUT': return <AboutScreen />;
            case 'CONTACT': return <ContactScreen />;
            default: return <HomeScreen />;
        }
    };

    const showHeader = currentPage.name !== 'LOGIN' && currentPage.name !== 'USER_DETAILS';

    return (
        <AppContext.Provider value={contextValue}>
            <div className="min-h-screen bg-white font-sans">
                {showHeader && <Header />}
                <main className={showHeader ? "pt-16" : ""}>
                    {renderPage()}
                </main>
            </div>
        </AppContext.Provider>
    );
};

export default App;