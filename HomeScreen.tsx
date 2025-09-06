
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../constants';
// Fix: Import Category as a value for enum access, and Product as a type.
import { Category, type Product } from '../types';
import Button from '../components/Button';

const categoryIcons: Record<Category, JSX.Element> = {
    [Category.ELECTRONICS]: <svg xmlns="http://www.w.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    [Category.FASHION]: <svg xmlns="http://www.w.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, // Placeholder, needs better icon
    [Category.HOME_GARDEN]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    [Category.BOOKS_MEDIA]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    [Category.COLLECTIBLES_ART]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    [Category.HOBBIES]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
};


const HomeScreen: React.FC = () => {
    const { products, searchTerm } = useAppContext();
    const [sortOption, setSortOption] = useState('default');
    
    const [showFilters, setShowFilters] = useState(false);
    const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [groupBy, setGroupBy] = useState<'none' | 'category'>('none');


    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
            const price = product.price;
            const matchesMinPrice = minPrice === '' || price >= parseFloat(minPrice);
            const matchesMaxPrice = maxPrice === '' || price <= parseFloat(maxPrice);
            return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
        });

        switch (sortOption) {
            case 'price-asc':
                return filtered.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return filtered.sort((a, b) => b.price - a.price);
            default:
                return filtered;
        }
    }, [products, searchTerm, filterCategory, minPrice, maxPrice, sortOption]);

    const groupedProducts = useMemo(() => {
        if (groupBy !== 'category') return null;
        return filteredAndSortedProducts.reduce((acc, product) => {
            const category = product.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {} as Record<Category, Product[]>);
    }, [groupBy, filteredAndSortedProducts]);

    return (
        <div className="bg-white">
             {/* Hero Section */}
            <div className="relative h-[450px] bg-cover bg-center text-white" style={{backgroundImage: "url('https://picsum.photos/seed/ecofinds-hero/1600/500')"}}>
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Unique Pre-loved Items</h1>
                    <p className="text-lg md:text-xl mb-8">Your marketplace for sustainable finds.</p>
                    <Button onClick={() => document.getElementById('featured-items')?.scrollIntoView()} className="bg-primary-400 hover:bg-primary-500 text-lg px-8 py-3">Shop Now</Button>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-slate-50 border-y sticky top-16 z-10">
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-center space-x-2 md:space-x-4 py-3">
                     <select
                        id="sort-select"
                        value={sortOption}
                        onChange={e => setSortOption(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 cursor-pointer hover:border-gray-300 transition-colors"
                    >
                        <option value="default">Sort: Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                     <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`py-2 px-4 rounded-lg transition flex items-center space-x-2 border text-gray-700 ${showFilters ? 'bg-primary-100 text-primary-700 border-primary-300' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894L7 18v-3.586L3.293 6.707A1 1 0 013 6V4z"></path></svg>
                        <span>Filter</span>
                    </button>
                    <button
                        onClick={() => setGroupBy(prev => prev === 'category' ? 'none' : 'category')}
                        className={`py-2 px-4 rounded-lg transition flex items-center space-x-2 border text-gray-700 ${groupBy === 'category' ? 'bg-primary-100 text-primary-700 border-primary-300' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                         <span>Group By: {groupBy === 'category' ? 'Category' : 'None'}</span>
                    </button>
                </div>
                {showFilters && (
                    <div className="container mx-auto px-4 md:px-6 pb-4">
                        <div className="bg-white p-4 rounded-lg border grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="filter-category" className="block text-sm font-medium text-gray-700">Category</label>
                                <select id="filter-category" value={filterCategory} onChange={e => setFilterCategory(e.target.value as Category | 'All')} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                                    <option value="All">All Categories</option>
                                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="min-price" className="block text-sm font-medium text-gray-700">Min Price (₹)</label>
                                <input type="number" id="min-price" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div>
                                <label htmlFor="max-price" className="block text-sm font-medium text-gray-700">Max Price (₹)</label>
                                <input type="number" id="max-price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Any" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                {/* Category Browser */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Browse by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg hover:shadow-lg hover:border-primary-500 transition-all text-gray-600 hover:text-primary-600"
                            >
                                {categoryIcons[cat]}
                                <span className="mt-2 text-sm font-semibold">{cat}</span>
                            </button>
                        ))}
                    </div>
                </div>


                {/* Product Grid Section */}
                <div id="featured-items" className="scroll-mt-24">
                     <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Featured Items</h2>
                     
                    {groupBy === 'category' && groupedProducts ? (
                        Object.entries(groupedProducts).map(([category, items]) => (
                            <div key={category} id={`category-${category.replace(/\s|&/g, '-')}`} className="mb-12">
                                <h3 className="text-xl font-bold text-gray-800 my-4 border-b pb-2">{category}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {items.map(product => <ProductCard key={product.id} product={product} />)}
                                </div>
                            </div>
                        ))
                    ) : (
                        filteredAndSortedProducts.length > 0 ? (
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredAndSortedProducts.map(product => <ProductCard key={product.id} product={product} />)}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <h2 className="text-2xl font-semibold text-gray-700">No products found</h2>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
