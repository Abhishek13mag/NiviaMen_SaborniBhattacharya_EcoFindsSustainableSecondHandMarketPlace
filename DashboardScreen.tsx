import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';

const COUNTRY_CODES = ['+91', '+44', '+1', '+61', '+81'];

const DisplayField: React.FC<{ label: string; value?: string | number; icon?: JSX.Element; }> = ({ label, value, icon }) => (
    <div>
        <h3 className="text-sm font-medium text-gray-500 flex items-center">{icon && <span className="mr-2">{icon}</span>}{label}</h3>
        <p className="mt-1 text-md text-gray-900 pl-7">{value || <span className="text-gray-400">Not provided</span>}</p>
    </div>
);


const DashboardScreen: React.FC = () => {
    const { currentUser, updateUser, logout, navigate } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    
    // Form state
    const [username, setUsername] = useState(currentUser?.username || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [address, setAddress] = useState(currentUser?.address || '');
    const [age, setAge] = useState(currentUser?.age?.toString() || '');
    const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
    const [localNumber, setLocalNumber] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(currentUser?.image || null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetFormState = () => {
        if (!currentUser) return;
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        setAddress(currentUser.address || '');
        setAge(currentUser.age?.toString() || '');
        setImagePreview(currentUser.image || null);

        if (currentUser.contactNumber) {
            const parts = currentUser.contactNumber.split(' ');
            if (parts.length > 1 && COUNTRY_CODES.includes(parts[0])) {
                setCountryCode(parts[0]);
                setLocalNumber(parts.slice(1).join(' '));
            } else {
                setCountryCode(COUNTRY_CODES[0]); // Reset to default if format is unexpected
                setLocalNumber(currentUser.contactNumber);
            }
        } else {
            setCountryCode(COUNTRY_CODES[0]);
            setLocalNumber('');
        }
    };

    useEffect(() => {
        if (currentUser) {
            resetFormState();
        }
    }, [currentUser]);
    
    if (!currentUser) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleUpdate = () => {
        setError('');
        const ageNumber = parseInt(age, 10);
        
        if (age && (isNaN(ageNumber) || ageNumber < 18 || ageNumber > 100)) {
            setError('Age must be a number between 18 and 100.');
            return;
        }

        if (localNumber && !/^\d+$/.test(localNumber)) {
            setError('Contact number must only contain digits.');
            return;
        }

        updateUser({
            ...currentUser,
            username,
            email,
            address: address.trim() || undefined,
            age: age ? ageNumber : undefined,
            contactNumber: localNumber ? `${countryCode} ${localNumber.trim()}` : undefined,
            image: imagePreview || currentUser.image,
        });

        setIsEditing(false);
        setError('');
    };

    const handleCancel = () => {
        setIsEditing(false);
        resetFormState();
        setError('');
    };

    const handleNumericInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const numericValue = value.replace(/[^0-9]/g, '');
        setter(numericValue);
    };

    return (
        <div className="container mx-auto p-4 md:p-6">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* User Info Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                            <p className="text-sm text-gray-500">Manage your personal details.</p>
                        </div>
                        {!isEditing && (
                            <button onClick={() => setIsEditing(true)} className="flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
                                Edit
                            </button>
                        )}
                    </div>
                    
                    <div className="flex flex-col items-center">
                         <div className="relative mb-4">
                            <img src={imagePreview || 'https://picsum.photos/seed/placeholder/200'} alt={username} className="w-32 h-32 object-cover rounded-full border-4 border-primary-300" />
                            {isEditing && (
                                <>
                                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                                    <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-primary-500 text-white rounded-full p-2 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    
                    {!isEditing ? (
                        <div className="text-center mt-2">
                             <h2 className="text-xl font-bold text-gray-800">{currentUser.username}</h2>
                             <p className="text-md text-gray-500">{currentUser.email}</p>
                             <div className="mt-6 text-left space-y-4">
                                <DisplayField label="Address" value={currentUser.address} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
                                <DisplayField label="Age" value={currentUser.age} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                                <DisplayField label="Contact" value={currentUser.contactNumber} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>} />
                             </div>
                        </div>
                    ) : (
                        <div className="w-full space-y-4 mt-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <Input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="mt-1" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <Input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <Textarea id="address" value={address} onChange={e => setAddress(e.target.value)} rows={3} className="mt-1" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                                    <Input type="text" id="age" value={age} onChange={handleNumericInputChange(setAge)} className="mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                                    <div className="flex mt-1">
                                        <Select value={countryCode} onChange={e => setCountryCode(e.target.value)} className="rounded-r-none focus:z-10">
                                            {COUNTRY_CODES.map(code => <option key={code} value={code}>{code}</option>)}
                                        </Select>
                                        <Input type="tel" id="contactNumber" value={localNumber} onChange={handleNumericInputChange(setLocalNumber)} className="rounded-l-none" />
                                    </div>
                                </div>
                            </div>
                            {error && <p className="text-sm text-red-600 text-center col-span-2">{error}</p>}
                             <div className="flex justify-end space-x-2 pt-4">
                                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                                <Button onClick={handleUpdate}>Save Changes</Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigations Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                     <h2 className="text-2xl font-bold text-gray-800 mb-4">Navigations</h2>
                     <div className="space-y-3">
                         <button onClick={() => navigate({ name: 'MY_LISTINGS' })} className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition flex items-center">
                            <div className="bg-primary-100 rounded-lg p-2 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">My Listings</h3>
                                <p className="text-sm text-gray-500">View and manage the items you are selling.</p>
                            </div>
                         </button>
                         <button onClick={() => navigate({ name: 'ORDERS' })} className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition flex items-center">
                            <div className="bg-primary-100 rounded-lg p-2 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">My Purchases</h3>
                                <p className="text-sm text-gray-500">Review your past orders and purchase history.</p>
                            </div>
                         </button>
                     </div>
                </div>

                {/* Logout Section */}
                 <div className="bg-white p-4 rounded-lg shadow-lg">
                    <Button variant="danger" onClick={logout} className="w-full">Logout</Button>
                 </div>
            </div>
        </div>
    );
};

export default DashboardScreen;
