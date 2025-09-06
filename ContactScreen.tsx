import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/Button';

const ContactScreen: React.FC = () => {
    const { navigate } = useAppContext();

    return (
        <div className="container mx-auto p-4 md:p-6 text-center">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
                <p className="text-gray-600 mb-6">
                    Have questions or feedback? We'd love to hear from you. Reach out to our support team at <a href="mailto:support@ecofinds.com" className="text-primary-600 hover:underline">support@ecofinds.com</a>. We typically respond within 24 hours.
                </p>
                <Button onClick={() => navigate({ name: 'HOME' })}>Go to Home</Button>
            </div>
        </div>
    );
};

export default ContactScreen;
