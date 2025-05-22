import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = ({ navLinks, isAuthenticated }) => {
    return navLinks.map(({ path, label, showWhen = 'always' }) => {
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
    });
};

export default NavLinks;
