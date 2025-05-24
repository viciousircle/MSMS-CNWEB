import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    UserCircleIcon,
    InformationCircleIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import BrandSection from './BrandSection';
import NavLinks from './NavLinks';
import ProfileDropdown from './ProfileDropdown';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
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
            {/* Desktop Nav */}
            <div className="hidden md:flex justify-center gap-4 items-center">
                <BrandSection
                    brandLink={brandLink}
                    brandName={brandName}
                    showBrandIcon={showBrandIcon}
                />
                <NavLinks
                    navLinks={navLinks}
                    isAuthenticated={isAuthenticated}
                />
                {authLinks &&
                    (isAuthenticated() ? (
                        <ProfileDropdown
                            user={user}
                            profileDropdownItems={profileDropdownItems}
                            defaultProfileDropdownItems={
                                defaultProfileDropdownItems
                            }
                        />
                    ) : (
                        <Link to="/login">
                            <div className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5">
                                <UserCircleIcon className="size-6" />
                            </div>
                        </Link>
                    ))}
                <Link to="/about">
                    <div className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5">
                        <InformationCircleIcon className="size-6" />
                    </div>
                </Link>
            </div>
            {/* Mobile Nav */}
            <div className="flex md:hidden justify-between items-center px-2 h-fit min-h-0">
                <BrandSection
                    brandLink={brandLink}
                    brandName={brandName}
                    showBrandIcon={showBrandIcon}
                    isMobile={true}
                />
                <Button
                    variant="ghost"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-1 h-8 w-8 flex items-center justify-center"
                >
                    {isMobileMenuOpen ? (
                        <XMarkIcon className="size-6" />
                    ) : (
                        <Bars3Icon className="size-6" />
                    )}
                </Button>
            </div>
            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-12 left-0 w-full bg-white border-t border-gray-950/5 shadow-lg z-50">
                    <div className="flex flex-col items-stretch py-1">
                        {/* Nav Links */}
                        <NavLinks
                            navLinks={navLinks}
                            isAuthenticated={isAuthenticated}
                            isMobile={true}
                        />
                        {/* Profile/Login */}
                        {authLinks &&
                            (isAuthenticated() ? (
                                <div className="flex items-center gap-3 px-4 py-2 text-base font-medium text-gray-900 border-t border-gray-100">
                                    <UserCircleIcon className="size-6" />
                                    <span>{user?.name || 'Profile'}</span>
                                    <Button
                                        onClick={handleLogout}
                                        variant="link"
                                        className="text-red-500 hover:bg-red-100 px-2 py-0 h-auto"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-3 px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-950/5 border-t border-gray-100"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <UserCircleIcon className="size-6" />
                                    <span>Login</span>
                                </Link>
                            ))}
                        {/* About */}
                        <Link
                            to="/about"
                            className="flex items-center gap-3 px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-950/5 border-t border-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <InformationCircleIcon className="size-6" />
                            <span>About</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default BaseNavigationBar;
