import React from 'react';
import BaseNavigationBar from './BaseNavigationBar';

const SellerNavigationBar = () => {
    const navLinks = [
        {
            path: '/orders',
            label: 'Orders',
            showWhen: 'authenticated',
        },
    ];

    return <BaseNavigationBar brandLink="/dashboard" navLinks={navLinks} />;
};

export default SellerNavigationBar;
