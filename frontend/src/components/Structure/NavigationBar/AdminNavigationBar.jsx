import React from 'react';
import BaseNavigationBar from './BaseNavigationBar';

const AdminNavigationBar = () => {
    const navLinks = [
        {
            path: '/account',
            label: 'Manage Account',
            showWhen: 'authenticated',
        },
    ];

    return <BaseNavigationBar brandLink="/account" navLinks={navLinks} />;
};

export default AdminNavigationBar;
