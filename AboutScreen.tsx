import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/Button';

const AboutScreen: React.FC = () => {
    const { navigate } = useAppContext();

    return (
        <div className="container mx-auto p-4 md:p-6 text-center">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">About EcoFinds</h1>
                <p className="text-gray-600 mb-6 text-left">
                    EcoFinds is a vibrant and trusted platform that revolutionizes the way people buy and sell pre-owned goods. It aims to foster a culture of sustainability by extending the lifecycle of products, reducing waste, and providing an accessible and convenient alternative to purchasing new items.
                </p>
                 <p className="text-gray-600 mb-6 text-left">
                    Our mission is to create a community-driven marketplace where every transaction contributes to a healthier planet. We believe in the power of second-hand and the positive impact it can have on our environment and wallets.
                </p>
                <Button onClick={() => navigate({ name: 'HOME' })}>Go to Home</Button>
            </div>
        </div>
    );
};

export default AboutScreen;
