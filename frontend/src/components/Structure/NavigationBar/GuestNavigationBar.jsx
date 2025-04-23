import React from 'react';
import {
    BuildingStorefrontIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import BaseNavigationBar from './BaseNavigationBar';

const GuestNavigationBar = () => {
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

    return (
        <BaseNavigationBar
            brandLink="/"
            navLinks={navLinks}
            showBrandIcon={false}
        />
    );
};

export default GuestNavigationBar;
