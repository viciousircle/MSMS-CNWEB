import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    UserCircleIcon,
    InformationCircleIcon,
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
        </nav>
    );
};

export default BaseNavigationBar;
