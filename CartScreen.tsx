
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/Button';
import type { Product } from '../types';

const CartScreen: React.FC = () => {
    const { cart, products, navigate, removeFromCart, addToCart, checkout } = useAppContext();
    const cartItems = Object.keys(cart)
        .map(productId => {
            const product = products.find(p => p.id === productId);
            return product ? { ...product, quantity: cart[productId] } : null;
        })
        .filter((item): item is Product & { quantity: number } => item !== null);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-4 md:p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
                {cartItems.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
                        <div className="space-y-4">
                           {cartItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border-b">
                                    <img src={item.imageUrls[0]} alt={item.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                        <p className="text-gray-500">₹{item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-full border bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-primary-500">-</button>
                                        <span className="w-10 text-center font-semibold text-gray-800 text-lg">{item.quantity}</span>
                                        <button onClick={() => addToCart(item.id)} className="w-8 h-8 rounded-full border bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-primary-500">+</button>
                                    </div>
                                    <p className="font-semibold w-20 text-right text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                           ))}
                        </div>

                        <div className="border-t pt-6 space-y-4">
                            <div className="flex justify-between items-center text-lg">
                                <p className="text-gray-600">Subtotal:</p>
                                <p className="font-bold text-2xl text-gray-900">₹{subtotal.toFixed(2)}</p>
                            </div>
                            <Button onClick={checkout} className="w-full text-lg py-3">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                ) : (
                     <div className="text-center py-16 bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty.</h2>
                        <p className="text-gray-500 mt-2">Browse our products to find something you'll love!</p>
                        <Button className="mt-6" onClick={() => navigate({ name: 'HOME' })}>Start Shopping</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartScreen;