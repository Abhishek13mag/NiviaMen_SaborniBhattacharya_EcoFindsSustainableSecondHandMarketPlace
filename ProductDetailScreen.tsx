
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/Button';

interface ProductDetailScreenProps {
    productId: string;
}

const DetailItem: React.FC<{ label: string; value?: string | number | null; }> = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="flex justify-between py-2 border-b border-gray-100">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="text-sm text-gray-900 text-right">{value}</dd>
        </div>
    );
};

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ productId }) => {
    const { products, users, navigate, addToCart } = useAppContext();
    const product = products.find(p => p.id === productId);
    const seller = users.find(u => u.id === product?.sellerId);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!product) {
        return (
            <div className="container mx-auto p-4 md:p-6 text-center py-10">
                <h2 className="text-2xl font-semibold text-gray-700">Product not found</h2>
                <Button className="mt-4" onClick={() => navigate({ name: 'HOME' })}>Back to Home</Button>
            </div>
        );
    }
    
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrls.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.imageUrls.length) % product.imageUrls.length);
    };

    return (
        <div className="container mx-auto p-4 md:p-6">
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <button onClick={() => navigate({ name: 'HOME' })} className="mb-6 flex items-center text-primary-600 hover:text-primary-800 font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Listings
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div>
                        <div className="relative">
                            <img src={product.imageUrls[currentImageIndex]} alt={`${product.title} - image ${currentImageIndex + 1}`} className="w-full h-auto object-cover rounded-lg shadow-md aspect-square" />
                            {product.imageUrls.length > 1 && (
                                <>
                                    <button onClick={handlePrevImage} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition focus:outline-none focus:ring-2 focus:ring-primary-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <button onClick={handleNextImage} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition focus:outline-none focus:ring-2 focus:ring-primary-500">
                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </>
                            )}
                        </div>
                        {product.imageUrls.length > 1 && (
                            <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                                {product.imageUrls.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Thumbnail ${index + 1}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 flex-shrink-0 ${currentImageIndex === index ? 'border-primary-500' : 'border-transparent'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-4">
                        <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full self-start">{product.category}</span>
                        <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
                        <p className="text-4xl font-extrabold text-primary-600">₹{product.price.toFixed(2)}</p>
                        
                        <div className="border-t pt-4">
                            <h2 className="text-lg font-semibold text-gray-800">Description</h2>
                            <p className="text-gray-600 mt-2">{product.description}</p>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Item Details</h3>
                            <dl>
                                <DetailItem label="Condition" value={product.condition} />
                                <DetailItem label="Brand" value={product.brand} />
                                <DetailItem label="Model" value={product.model} />
                                <DetailItem label="Color" value={product.color} />
                                <DetailItem label="Material" value={product.material} />
                                <DetailItem label="Year" value={product.yearOfManufacture} />
                                <DetailItem label="Dimensions" value={product.dimensions} />
                                <DetailItem label="Weight" value={product.weight} />
                                <DetailItem label="Quantity Available" value={product.quantity} />
                                <DetailItem label="Original Packaging" value={product.originalPackaging ? 'Yes' : 'No'} />
                                <DetailItem label="Manual Included" value={product.manualIncluded ? 'Yes' : 'No'} />
                            </dl>
                        </div>

                         <div className="border-t pt-4">
                            <h2 className="text-lg font-semibold text-gray-800">Working Condition</h2>
                            <p className="text-gray-600 mt-2">{product.workingCondition}</p>
                        </div>

                        {seller && (
                            <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md">
                                <img src={seller.image} alt={seller.username} className="h-12 w-12 rounded-full object-cover" />
                                <div>
                                    <p className="text-sm text-gray-500">Sold by</p>
                                    <p className="font-semibold text-gray-800">{seller.username}</p>
                                </div>
                            </div>
                        )}
                        <div className="pt-4">
                             <Button onClick={() => addToCart(product.id)} className="w-full text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailScreen;