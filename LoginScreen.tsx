import React, { useState, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import type { LoginResult, SignUpResult } from '../types';
import Input from '../components/Input';

const LoginScreen: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { login, signUp } = useAppContext();

    useEffect(() => {
        // Reset fields when toggling between login and sign up to prevent state issues
        setError('');
        setEmail('');
        setPassword('');
        setUsername('');
        setConfirmPassword('');
    }, [isLogin]);

    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            if (!email || !password) {
                setError('Please fill in all fields.');
                return;
            }
            if (!validateEmail(email)) {
                setError('Please enter a valid email address.');
                return;
            }
            const result: LoginResult = login(email, password);
            switch (result) {
                case 'USER_NOT_FOUND':
                    setError('User with this email does not exist.');
                    break;
                case 'INVALID_PASSWORD':
                    setError('Incorrect password. Please try again.');
                    break;
                case 'SUCCESS':
                    break; // Navigation is handled in context
            }
        } else { // Sign up
            if(!username || !email || !password || !confirmPassword) {
                setError('Please fill in all fields.');
                return;
            }
            if (!validateEmail(email)) {
                setError('Please enter a valid email address.');
                return;
            }
            if (password.length < 6) {
                setError('Password must be at least 6 characters long.');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }

            const result: SignUpResult = signUp(username, email, password);
            if (result === 'EMAIL_EXISTS') {
                setError('An account with this email already exists.');
            }
        }
    };
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm">
                <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-primary-500">
                             <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>
                    
                    <h1 className="text-center text-2xl font-bold text-gray-800">
                        {isLogin ? 'Sign In to Your Account' : 'Create Your Account'}
                    </h1>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                                <Input id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1" />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <Input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1"/>
                        </div>
                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password:</label>
                            <Input id="password" name="password" type="password" autoComplete={isLogin ? "current-password" : "new-password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1"/>
                        </div>
                        {!isLogin && (
                            <div>
                                <label htmlFor="confirm-password"className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                                <Input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1" />
                            </div>
                        )}
                        
                        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                        <div className="pt-2">
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                {isLogin ? 'Sign in' : 'Sign up'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center text-sm mt-6">
                    <span className="text-gray-600">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    </span>
                    <button 
                        type="button"
                        onClick={() => setIsLogin(!isLogin)} 
                        className="font-medium text-primary-600 hover:text-primary-500"
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;