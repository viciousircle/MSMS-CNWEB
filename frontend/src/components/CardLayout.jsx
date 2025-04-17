import React from 'react';

const CardLayout = ({ children, variant = 'grid' }) => {
    const isGrid = variant === 'grid';

    return (
        <div className={`flex flex-col gap-4`}>
            <div className="text-center relative">
                <hr
                    className={
                        isGrid
                            ? 'hr-top'
                            : 'border-gray-950/5 absolute left-[-100%] right-[-100%] top-0'
                    }
                />

                <div
                    className={`grid w-full ${
                        isGrid
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                            : 'grid-cols-1 lg:grid-cols-1'
                    }`}
                >
                    {children}
                </div>

                <hr
                    className={
                        isGrid
                            ? 'hr-bot'
                            : 'border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]'
                    }
                />
            </div>
        </div>
    );
};

export default CardLayout;
