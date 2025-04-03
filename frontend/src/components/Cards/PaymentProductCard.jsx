import React from "react";

const PaymentProductCard = ({ product }) => {
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
                            <div className="text-2xl font-medium hover:underline">
                                {product.name}
                            </div>
                            <div className=" flex flex-col gap-2">
                                <div className="flex gap-2 items-center">
                                    <div className="tracking-wider font-medium">
                                        Color
                                    </div>
                                    {/* <div className="bg-black p-2 rounded-full"></div> */}
                                    <div className="border px-2 py-1 rounded-lg bg-gray-950/5 text-gray-500 text-sm">
                                        {product.color}
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className="tracking-wider font-medium">
                                        Quantity
                                    </div>
                                    <div className="border px-2 py-1 rounded-lg bg-gray-950/5 text-gray-500 text-sm">
                                        {product.quantity}
                                    </div>
                                </div>
                            </div>
                            <div className="font-mono border px-2 py-1 rounded-lg bg-gray-950/5 text-gray-500 ">
                                {product.price} VND
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
