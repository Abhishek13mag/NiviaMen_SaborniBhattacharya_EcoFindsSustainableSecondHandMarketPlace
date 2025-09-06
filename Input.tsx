import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
    const baseClasses = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900';
    return <input className={`${baseClasses} ${className}`} {...props} />;
};

export default Input;