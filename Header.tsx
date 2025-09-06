import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';

const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

const NavLink: React.FC<{ page: any, icon: JSX.Element, text: string, onClick: (page: any) => void }> = ({ page, icon, text, onClick }) => (
    <button onClick={() => onClick(page)} className="w-full flex items-center px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
        {icon}
        <span className="ml-3">{text}</span>
    </button>
);

const Header: React.FC = () => {
    const { currentUser, navigate, cart, searchTerm, setSearchTerm } = useAppContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

    const handleNav = (page: any) => {
        navigate(page);
        setMenuOpen(false);
    }

    return (
        <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-20 h-16">
            <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center">
                {/* Left Section */}
                <div className="flex items-center space-x-2">
                    {currentUser && (
                         <div className="relative">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <HamburgerIcon />
                            </button>
                            {menuOpen && (
                                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-3 border-b">
                                        <div className="flex items-center space-x-3">
                                            <img src={currentUser?.image} alt={currentUser?.username} className="h-10 w-10 rounded-full object-cover"/>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{currentUser?.username}</p>
                                                <p className="text-xs text-gray-500">{currentUser?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-1">
                                         <NavLink page={{ name: 'HOME' }} text="Home" onClick={handleNav} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}/>
                                         <NavLink page={{ name: 'MY_LISTINGS' }} text="My Listings" onClick={handleNav} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>}/>
                                         <NavLink page={{ name: 'ADD_PRODUCT' }} text="Add Product" onClick={handleNav} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}/>
                                         <NavLink page={{ name: 'ORDERS' }} text="Purchases" onClick={handleNav} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}/>
                                    </div>
                                    <div className="border-t my-1"></div>
                                    <div className="py-1">
                                        <NavLink page={{ name: 'ABOUT' }} text="About" onClick={handleNav} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}/>
                                        <NavLink page={{ name: 'CONTACT' }} text="Contact" onClick={handleNav} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate({ name: 'HOME' })}>
                        <div className="bg-primary-500 text-white rounded-full p-1">
                            <CheckIcon className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-xl text-gray-800">EcoFinds</span>
                    </div>
                </div>

                {/* Center: Search Bar */}
                <div className="flex-1 mx-4 md:mx-8 hidden sm:block">
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                             <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search for items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full block pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                        />
                     </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <button onClick={() => navigate({ name: 'CART' })} className="relative text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>}
                    </button>
                    {currentUser ? (
                         <div className="cursor-pointer" onClick={() => navigate({ name: 'DASHBOARD' })}>
                            <img src={currentUser.image} alt={currentUser.username} className="h-9 w-9 rounded-full object-cover border-2 border-gray-200 hover:border-primary-500 transition"/>
                        </div>
                    ) : (
                        <button onClick={() => navigate({name: 'LOGIN'})} className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition">
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;