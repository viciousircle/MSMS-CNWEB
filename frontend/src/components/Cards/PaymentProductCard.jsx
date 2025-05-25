import React from 'react';
import { formatPrice } from '/utils/formatPrice';

const PaymentProductCard = ({ product }) => {
    const rawPrice =
        typeof product.price === 'string'
            ? Number(product.price.replace(/\./g, ''))
            : product.price;

    const productTotal = rawPrice * product.quantity;

    const formattedPrice = formatPrice(productTotal);

    // console.log(product.price);

    return (
        <div className="flex flex-col w-full gap-0">
            <div className="flex w-full gap-0">
                <div className="p-2"></div>
                <div className="border-gray-950/5 border-x p-2 w-full"></div>
                <div className="p-2"></div>
            </div>
            <div className="flex w-full gap-0">
                <div className="border-gray-950/5 border-y p-2"></div>
                <div className="flex border border-gray-950/5 p-2 w-full gap-4 bg-gray-950/2.5 min-w-max">
                    <div className="flex bg-white h-56 justify-center rounded-lg w-1/5 items-center outline outline-gray-950/5">
                        <img
                            src={product.img}
                            alt="MacBookk"
                            className="w-64 object-contain"
                        />
                    </div>
                    <div className="flex flex-col justify-center w-full gap-2 items-center px-4">
                        <div className="flex justify-between w-full items-center">
                            <div className="text-2xl font-medium">
                                {product.name}
                            </div>
                            <div className=" flex flex-col gap-2">
                                <div className="flex gap-2 items-center">
                                    <div className="tracking-wider font-medium">
                                        Color
                                    </div>
                                    <div className="border px-4 py-1 rounded-lg text-sm bg-white text-gray-500 font-mono w-full cursor-not-allowed">
                                        {product.color}
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className="tracking-wider font-medium">
                                        Quantity
                                    </div>
                                    <div className="border px-4 py-1 rounded-lg text-sm bg-white text-gray-500 font-mono w-full cursor-not-allowed">
                                        {product.quantity}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="border px-4 py-1 rounded-lg text-sm bg-white text-gray-800 font-mono cursor-not-allowed flex justify-between">
                                    <div className="font-medium text-gray-400 pr-2">
                                        Price
                                    </div>
                                    {product.price} VND
                                </div>
                                <div className="border px-4 py-1 rounded-lg text-sm bg-white text-gray-800 font-mono cursor-not-allowed flex justify-between">
                                    <div className="font-medium text-gray-400 pr-2">
                                        Total
                                    </div>
                                    <div className="">{formattedPrice} VND</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-gray-950/5 border-y p-2"></div>
            </div>
            <div className="flex w-full gap-0">
                <div className="p-2"></div>
                <div className="border-gray-950/5 border-x p-2 w-full"></div>
                <div className="p-2"></div>
            </div>
        </div>
    );
};

export default PaymentProductCard;
