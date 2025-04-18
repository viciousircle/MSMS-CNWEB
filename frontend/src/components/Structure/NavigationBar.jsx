import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const navLinks = [
    { path: '/', label: 'Store' },
    { path: '/cart', label: 'Cart' },
    { path: '/payment', label: 'Payment' },
    { path: '/order', label: 'Order' },

    { path: '/notfound', label: 'Not Found' },
    { path: '/profile', label: 'Profile' },
];

const NavigationBar = () => {
    const navigate = useNavigate();

    // Get user data from localStorage
    const customer = JSON.parse(localStorage.getItem('customer'));

    console.log('Customer:', customer);

    const handleLogout = () => {
        // Remove customer data from localStorage
        localStorage.removeItem('customer');
        // Redirect to home page
        navigate('/');
        // Reload the page to update the UI
        window.location.reload();
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-950/5">
            <div className="flex justify-center gap-4 items-center">
                <Link to="/">
                    <div className="flex gap-4 items-center py-2 px-6 uppercase tracking-wider text-black border-x border-gray-950/5 bg-gray-950/2.5 font-medium font-serif">
                        <div className="text-gray-800">VICIOUSTORE</div>
                    </div>
                </Link>
                {navLinks.map(({ path, label }) => (
                    <Link to={path} key={path}>
                        <div className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5">
                            {label}
                        </div>
                    </Link>
                ))}

                {/* Conditionally show login/signup or user profile + logout */}
                {customer ? (
                    <Popover className="relative">
                        <PopoverButton className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5">
                            {customer.name}
                            <ChevronDownIcon className="h-4 w-4" />
                        </PopoverButton>
                        <PopoverPanel className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200">
                            <div className="p-1">
                                <Link to="/profile">
                                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </div>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        </PopoverPanel>
                    </Popover>
                ) : (
                    <>
                        <Link to="/login">
                            <div className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5">
                                Log In
                            </div>
                        </Link>
                        <Link to="/signup">
                            <div className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5">
                                Sign Up
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;
