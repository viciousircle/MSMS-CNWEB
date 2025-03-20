import React from "react";
import img2 from "../assets/img2.jpeg";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const Cart = () => {
    return (
        <main className="flex justify-between w-full overflow-hidden relative">
            {/* Left Decoration */}
            <div className="bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed border-x text-gray-950/5 px-6"></div>

            {/* Center Content */}
            <div className="flex flex-col w-full gap-8 pt-8">
                {/* Title Section */}
                <div className="relative">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <h1 className="text-5xl text-pretty gap-x-2 flex max-w-none  tracking-widest whitespace-nowrap items-center">
                        <div className="border-r border-gray-950/5 flex items-center">
                            <ShoppingCartIcon className="size-20 py-1 px-2" />
                        </div>
                        <div className="px-2 font-serif">Cart</div>
                    </h1>
                    <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                </div>

                <div className="relative">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                        <div className="flex border-gray-950/5 border-x gap-2 hover:bg-gray-950/2.5 items-center px-4 py-2">
                            <div className="border p-2"></div>
                            <div className="">Products</div>
                        </div>
                    </div>

                    <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                </div>

                {/* MacBook Section */}
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                        <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                            <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2 w-fit">
                                <div className="">12/12/2025</div>
                            </div>
                            <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2">
                                <div className="">4 ITEMS</div>
                            </div>
                        </div>

                        <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                    </div>

                    {/* Product Grid */}
                    <div className="text-center relative">
                        {/* Top Decorative Line */}
                        <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 w-full lg:grid-cols-1">
                            {[...Array(8)].map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col w-full gap-0"
                                >
                                    <Horizon />
                                    <div className="flex w-full gap-0">
                                        <Vertical />
                                        <div className="flex border border-gray-950/5 p-2 w-full gap-4 hover:bg-gray-950/2.5 min-w-max">
                                            <div className="flex items-center pl-2">
                                                <div className="border border-gray-300 p-2"></div>
                                            </div>
                                            <div className="flex bg-white h-64 justify-center rounded-lg w-1/5 items-center outline outline-gray-950/5">
                                                <img
                                                    src={img2}
                                                    alt="MacBook"
                                                    className="w-64 object-contain"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center w-full gap-2 items-center px-4">
                                                <div className="flex justify-between w-full items-center">
                                                    <div className="text-2xl font-medium hover:underline">
                                                        MacBook Pro
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="tracking-wider">
                                                            Quantity
                                                        </div>
                                                        <div className="bg-gray-950/2.5 border p-2 rounded-sm">
                                                            10
                                                        </div>
                                                    </div>
                                                    <div className="font-mono">
                                                        39.000.000 VND
                                                    </div>
                                                </div>

                                                <div className="flex border-gray-300 border-t justify-between w-full gap-2 items-center pt-2">
                                                    <div className="text-gray-500 tracking-widest">
                                                        Available
                                                    </div>
                                                    <div className="text-red-500 hover:underline">
                                                        Delete
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Vertical />
                                    </div>
                                    <Horizon />
                                </div>
                            ))}
                        </div>

                        {/* Bottom Decorative Line */}
                        <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                    </div>
                </div>

                {/* Footer Section */}
                <div className="text-center relative">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <div className="text-lg w-1/2 font-medium py-2">Hi</div>
                    <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                </div>
            </div>

            {/* Right Decoration */}
            <div className="bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed border-x text-gray-950/5 px-6"></div>

            {/* Fixed Bill Section */}
            <div className=" bg-white border-gray-950/5 border-t w-full bottom-0 fixed  items-center left-0  bg-[image:repeating-linear-gradient(45deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed border-x text-gray-950/5 flex justify-center">
                <div className="flex  justify-center bg-white w-fit border-x">
                    <div className=" font-medium text-black py-4 px-8 bg-gray-950/5 ">
                        Total: 312.000.000 VND
                    </div>
                    <button className="bg-white  text-black border-l border-gray-950/5 cursor-pointer duration-300 hover:bg-black hover:outline hover:text-gray-200  transition  px-16 uppercase tracking-widest font-medium ">
                        Check out
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Cart;

function Horizon() {
    return (
        <div className="flex w-full gap-0">
            <div className="p-2"></div>
            <div className="border-gray-950/5 border-x p-2 w-full"></div>
            <div className="p-2"></div>
        </div>
    );
}

function Vertical() {
    return <div className="border-gray-950/5 border-y p-2"></div>;
}
