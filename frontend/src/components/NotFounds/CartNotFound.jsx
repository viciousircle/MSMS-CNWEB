import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const CartNotFound = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Your cart is empty
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Looks like you haven't added any items to your cart yet.
                    Start shopping to discover amazing products!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        href="/"
                        className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
                    >
                        Start Shopping
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CartNotFound;
