import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAuth } from '@/contexts/AuthContext';
import {
    ArrowLeftStartOnRectangleIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

const BaseNavigationBar = ({
    brandLink,
    navLinks = [],
    profileDropdownItems = [],
    authLinks = true,
    brandName = 'VICIOUSTORE',
    showBrandIcon = true,
}) => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const defaultProfileDropdownItems = [
        <Button
            key="logout"
            onClick={handleLogout}
            variant={'link'}
            className="text-red-500 hover:bg-red-100 w-full text-left"
        >
            <ArrowLeftStartOnRectangleIcon className="size-5" />
            Logout
        </Button>,
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-950/5">
            <div className="flex justify-center gap-4 items-center">
                <Link to={brandLink}>
                    <div className="flex gap-4 items-center py-2 px-6 uppercase tracking-wider text-black border-x border-gray-950/5 bg-gray-950/2.5 font-medium font-serif">
                        {showBrandIcon}
                        <div className="text-gray-800">{brandName}</div>
                    </div>
                </Link>

                {navLinks.map(({ path, label, showWhen = 'always' }) => {
                    if (
                        (showWhen === 'authenticated' && !isAuthenticated()) ||
                        (showWhen === 'unauthenticated' && isAuthenticated())
                    ) {
                        return null;
                    }
                    return (
                        <Link to={path} key={path}>
                            <div className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5">
                                {label}
                            </div>
                        </Link>
                    );
                })}

                {authLinks &&
                    (isAuthenticated() ? (
                        <Popover className="relative">
                            <PopoverButton className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5">
                                <UserCircleIcon className="size-6" />
                                {user?.name || 'Profile'}
                                <ChevronDownIcon className="h-4 w-4" />
                            </PopoverButton>
                            <PopoverPanel className="absolute z-10 mt-2 bg-white shadow-lg rounded-md border border-gray-200 w-48">
                                <div className="p-1">
                                    {[
                                        ...profileDropdownItems,
                                        ...defaultProfileDropdownItems,
                                    ]}
                                </div>
                            </PopoverPanel>
                        </Popover>
                    ) : (
                        <>
                            <Link to="/login">
                                <div className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5">
                                    <UserCircleIcon className="size-6" />
                                </div>
                            </Link>
                        </>
                    ))}
            </div>
        </nav>
    );
};

export default BaseNavigationBar;
