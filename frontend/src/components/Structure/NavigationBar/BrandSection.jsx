import React from 'react';
import { Link } from 'react-router-dom';

const BrandSection = ({ brandLink, brandName, showBrandIcon }) => {
    return (
        <Link to={brandLink}>
            <div className="flex gap-4 items-center py-2 px-6 uppercase tracking-wider text-black border-x border-gray-950/5 bg-gray-950/2.5 font-medium font-serif">
                {showBrandIcon}
                <div className="text-gray-800">{brandName}</div>
            </div>
        </Link>
    );
};

export default BrandSection;
