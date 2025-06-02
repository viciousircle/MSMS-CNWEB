import React from 'react';

const CardLayout = ({ children, variant = 'grid' }) => {
    const isGrid = variant === 'grid';

    return (
        <div className="flex flex-col">
            <div className="relative">
                <div
                    className={`grid w-full gap-6 ${
                        isGrid
                            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                            : 'grid-cols-1'
                    }`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CardLayout;
