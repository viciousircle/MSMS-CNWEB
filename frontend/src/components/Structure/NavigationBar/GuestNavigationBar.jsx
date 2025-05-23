import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import BaseNavigationBar from './BaseNavigationBar';

const GuestNavigationBar = () => {
    const navLinks = [];

    return (
        <BaseNavigationBar
            brandLink="/"
            navLinks={navLinks}
            showBrandIcon={false}
        />
    );
};

export default GuestNavigationBar;
