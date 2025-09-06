import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';


const UserDetailsScreen: React.FC = () => {
    const { currentUser, updateUser, navigate } = useAppContext();
    
    const [address, setAddress] = useState(currentUser?.address || '');
    const [age, setAge] = useState(currentUser?.age?.toString() || '');
    const [contactNumber, setContactNumber] = useState(currentUser?.contactNumber || '');
    const [error, setError] = useState('');

    if (!currentUser) {
        // Should not happen if flow is correct, but good practice
        navigate({ name: 'LOGIN' });
        return null;
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const ageNumber = parseInt(age, 10);
        if (age && (isNaN(ageNumber) || ageNumber <= 0)) {
            setError('Please enter a valid age.');
            return;
        }

        const updatedDetails = {
            address: address.trim() || undefined,
            age: age ? ageNumber : undefined,
            contactNumber: contactNumber.trim() || undefined,
        };

        updateUser({
            ...currentUser,
            ...updatedDetails,
        });

        navigate({ name: 'HOME' });
    };

    const handleSkip = () => {
        navigate({ name: 'HOME' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Complete Your Profile</h1>
                        <p className="text-gray-500 mt-2">This is optional. You can skip for now and add it later.</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSave}>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
                            <Textarea
                                id="address"
                                rows={3}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="mt-1"
                                placeholder="123 Eco Lane, Green City"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age:</label>
                                <Input
                                    id="age"
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="mt-1"
                                    placeholder="25"
                                />
                            </div>
                            <div>
                                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number:</label>
                                <Input
                                    id="contact"
                                    type="tel"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    className="mt-1"
                                    placeholder="555-123-4567"
                                />
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                        <div className="pt-2 space-y-4">
                            <Button type="submit" className="w-full text-lg py-3">
                                Save Details & Continue
                            </Button>
                            <Button variant="secondary" type="button" onClick={handleSkip} className="w-full text-lg py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400">
                                Skip for Now
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsScreen;
