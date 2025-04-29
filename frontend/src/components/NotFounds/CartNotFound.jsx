import React from 'react';

const CartNotFound = () => {
    return (
        <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className=" text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                Item not found
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                Let's go shopping to add some items to your cart!!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                    href="/"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Go back store
                </a>
            </div>
        </div>
    );
};

export default CartNotFound;
