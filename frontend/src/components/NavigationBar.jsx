import React from 'react';
import { Link } from 'react-router-dom';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
} from '@heroicons/react/20/solid';
import {
    ArrowPathIcon,
    ArrowTopRightOnSquareIcon,
    ChartPieIcon,
    ComputerDesktopIcon,
    CubeTransparentIcon,
    CursorArrowRaysIcon,
    DevicePhoneMobileIcon,
    DeviceTabletIcon,
    FingerPrintIcon,
    GifIcon,
    GiftIcon,
    RectangleGroupIcon,
    SquaresPlusIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import cat from '../assets/cat.svg';

const navLinks = [
    { path: '/', label: 'Store' },
    { path: '/cart', label: 'Cart' },
    { path: '/payment', label: 'Payment' },
    { path: '/order', label: 'Order' },
    { path: '/about', label: 'About' },
    { path: '/notfound', label: 'Not Found' },
    { path: '/profile', label: 'Profile' },
    { path: '/login', label: 'Log In' },
    { path: '/signup', label: 'Sign Up' },
];

const NavigationBar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-950/5">
            <div className="flex justify-center gap-4 items-center">
                <Link to="/about">
                    <div className="flex gap-4 items-center py-2 px-6 uppercase tracking-wider text-black border-x border-gray-950/5 bg-gray-950/2.5 font-medium font-serif">
                        <div className="text-gray-800">VICIOUSTORE</div>
                    </div>
                </Link>
                {navLinks.map(({ path, label }) => (
                    <Link to={path}>
                        <div
                            key={path}
                            className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5"
                        >
                            {label}
                        </div>
                    </Link>
                ))}
                <Link to="/profile">
                    <div className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5">
                        <UserCircleIcon className="size-6" />
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default NavigationBar;
