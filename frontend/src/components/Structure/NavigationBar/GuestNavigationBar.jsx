import React from 'react';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import BaseNavigationBar from './BaseNavigationBar';

const GuestNavigationBar = () => {
    const navLinks = [
        {
            path: '/',
            label: <BuildingStorefrontIcon className="size-6" />,
        },
    ];

    return <BaseNavigationBar brandLink="/" navLinks={navLinks} />;
};

export default GuestNavigationBar;
