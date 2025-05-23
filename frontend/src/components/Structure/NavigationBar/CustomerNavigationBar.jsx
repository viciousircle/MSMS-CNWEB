import React from 'react';
import {
    BuildingStorefrontIcon,
    InboxStackIcon,
    ShoppingBagIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';
import BaseNavigationBar from './BaseNavigationBar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CustomerNavigationBar = () => {
    const navLinks = [
        {
            path: '/',
            label: <BuildingStorefrontIcon className="size-6" />,
        },
        {
            path: '/cart',
            label: <ShoppingBagIcon className="size-6" />,
        },
    ];

    const profileDropdownItems = [
        <Link to="/order" key="orders">
            <Button
                variant={'link'}
                className="text-gray-900 hover:bg-gray-950/5 w-full text-left"
            >
                <InboxStackIcon className="size-5" />
                Order
            </Button>
        </Link>,
    ];

    return (
        <BaseNavigationBar
            brandLink="/"
            navLinks={navLinks}
            profileDropdownItems={profileDropdownItems}
        />
    );
};

export default CustomerNavigationBar;
