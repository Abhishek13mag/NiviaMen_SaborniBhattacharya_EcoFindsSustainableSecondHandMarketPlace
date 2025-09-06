import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ className = '', children, ...props }) => {
    const baseClasses = 'block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md shadow-sm bg-white text-gray-900';
    return <select className={`${baseClasses} ${className}`} {...props}>{children}</select>;
};

export default Select;