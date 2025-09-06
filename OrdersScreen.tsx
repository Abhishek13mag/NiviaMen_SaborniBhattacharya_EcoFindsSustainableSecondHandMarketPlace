
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import type { Product } from '../types';
import Button from '../components/Button';

const OrdersScreen: React.FC = () => {
    const { orders, products, currentUser, navigate } = useAppContext();
    const userOrders = orders.filter(o => o.userId === currentUser?.id);

    return (
        <div className="container mx-auto p-4 md:p-6">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">My Previous Purchases</h1>
                {userOrders.length > 0 ? (
                    <div className="space-y-8">
                        {userOrders.map(order => {
                            const orderItems = Object.keys(order.items)
                                .map(productId => {
                                    const product = products.find(p => p.id === productId);
                                    return product ? { ...product, quantity: order.items[productId] } : null;
                                })
                                .filter((item): item is Product & { quantity: number } => item !== null);
                            const orderTotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

                            return (
                                 <div key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">Order #{order.id.slice(-6)}</p>
                                            <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <p className="font-bold text-lg">Total: ₹{orderTotal.toFixed(2)}</p>
                                    </div>
                                    <ul className="divide-y divide-gray-200">
                                        {orderItems.map(item => (
                                            <li key={item.id} className="p-4 flex items-center space-x-4">
                                                <img src={item.imageUrls[0]} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity} - ₹{item.price.toFixed(2)} each</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
                        <h2 className="text-2xl font-semibold text-gray-700">No purchase history.</h2>
                        <p className="text-gray-500 mt-2">You haven't made any purchases yet.</p>
                         <Button className="mt-6" onClick={() => navigate({ name: 'HOME' })}>Start Shopping</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersScreen;