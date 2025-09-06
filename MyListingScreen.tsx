import React, { useState, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/Button';
import type { Product } from '../types';

const MyListingsScreen: React.FC = () => {
    const { products, currentUser, navigate, deleteProduct } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('default');

    const userProducts = useMemo(() => {
        let filtered = products.filter(p => 
            p.sellerId === currentUser?.id &&
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (sortOption) {
            case 'price-asc':
                return filtered.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return filtered.sort((a, b) => b.price - a.price);
            case 'title-asc':
                 return filtered.sort((a, b) => a.title.localeCompare(b.title));
            case 'title-desc':
                return filtered.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return filtered;
        }

    }, [products, currentUser, searchTerm, sortOption]);

    const ListingCard: React.FC<{product: Product}> = ({ product }) => (
        <li 
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-4 gap-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate({ name: 'PRODUCT_DETAIL', productId: product.id })}
        >
            <img src={product.imageUrls[0]} alt={product.title} className="w-full h-48 md:w-40 md:h-40 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-grow self-start md:self-center w-full">
                <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                <p className="text-2xl font-extrabold text-primary-600 my-1">₹{product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-500 space-y-1 mt-2">
                    <p><span className="font-semibold text-gray-600">Category:</span> {product.category}</p>
                    <p><span className="font-semibold text-gray-600">Status:</span> <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{product.condition}</span></p>
                </div>
            </div>
            <div className="flex flex-row md:flex-col gap-3 self-end md:self-center flex-shrink-0">
                <Button 
                    variant="secondary" 
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate({ name: 'EDIT_PRODUCT', productId: product.id });
                    }} 
                    className="w-full"
                >
                    Edit
                </Button>
                <Button 
                    variant="danger" 
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                    }} 
                    className="w-full"
                >
                    Delete
                </Button>
            </div>
        </li>
    );

    return (
        <div className="container mx-auto p-4 md:p-6">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-4xl font-bold text-gray-800">My Listings</h1>
                    <Button onClick={() => navigate({ name: 'ADD_PRODUCT' })} className="w-full md:w-auto text-lg">
                        + Add New
                    </Button>
                </div>
                
                {/* Controls */}
                <div className="bg-white p-4 rounded-xl shadow-md space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
                     {/* Search Bar */}
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search in your listings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full block pl-10 pr-4 py-2.5 border border-gray-300 bg-white rounded-lg text-gray-900 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                     {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:flex-shrink-0 md:grid-cols-none md:flex gap-2">
                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortOption}
                                onChange={e => setSortOption(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-primary-500 transition"
                            >
                                <option value="default">Sort By</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="title-asc">Name: A-Z</option>
                                <option value="title-desc">Name: Z-A</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        <button onClick={() => alert('Filter functionality is coming soon!')} className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition">Filter</button>
                        <button onClick={() => alert('Group By functionality is coming soon!')} className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition">Group By</button>
                    </div>
                </div>


                {userProducts.length > 0 ? (
                    <ul className="space-y-6">
                        {userProducts.map(product => (
                           <ListingCard key={product.id} product={product} />
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-700">You haven't listed any items yet.</h2>
                        <p className="text-gray-500 mt-2">Click the button to add your first product and start selling!</p>
                        <Button className="mt-6 text-lg" onClick={() => navigate({ name: 'ADD_PRODUCT' })}>+ Add New Product</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyListingsScreen;