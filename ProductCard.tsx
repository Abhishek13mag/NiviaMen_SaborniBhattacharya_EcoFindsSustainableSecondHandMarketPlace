
import React from 'react';
import type { Product } from '../types';
import { useAppContext } from '../hooks/useAppContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { navigate } = useAppContext();

    return (
        <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            onClick={() => navigate({ name: 'PRODUCT_DETAIL', productId: product.id })}
        >
            <div className="relative">
                <img src={product.imageUrls[0]} alt={product.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">{product.category}</div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-2xl font-bold text-primary-600">₹{product.price.toFixed(2)}</p>
                    <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">{product.condition}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;