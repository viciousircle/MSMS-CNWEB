import React from 'react';
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
