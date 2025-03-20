import React from "react";
import img2 from "../assets/img2.jpeg";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
} from "@heroicons/react/20/solid";
import {
    BanknotesIcon,
    CheckBadgeIcon,
    ChevronDoubleDownIcon,
    ChevronUpDownIcon,
    PencilIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const Payment = () => {
    return (
        <main className="flex justify-between w-full overflow-hidden relative ">
            {/* Left Decoration */}
            <div className="bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed border-x text-gray-950/5 px-6"></div>

            {/* Center Content */}
            <div className="flex flex-col w-full gap-8 pt-8 mt-16">
                {/* Title Section */}
                <div className="relative">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <h1 className="text-5xl text-pretty gap-x-2 flex max-w-none  tracking-widest whitespace-nowrap items-center">
                        <div className="border-r border-gray-950/5 flex items-center">
                            <BanknotesIcon className="size-20 py-1 px-2" />
                        </div>
                        <div className="px-2 font-serif">Payment</div>
                    </h1>
                    <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                </div>

                <div className="flex flex-col gap-0">
                    <div className="relative">
                        <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                        <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                            <div className="flex border-gray-950/5 border-x  bg-gray-950/2.5 items-center px-4 py-2 justify-between w-full">
                                <div className="">Infomation</div>
                            </div>
                            <div className="flex border-gray-950/5 border-x gap-2 hover:bg-gray-950/2.5 items-center px-4 py-2">
                                <PencilIcon className="size-6" />
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                        <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest  flex gap-4">
                            <div className="flex border-gray-950/5 border-x   w-full flex-col text-gray-500 font-serif">
                                <div className="flex items-center border-b border-gray-950/5 ">
                                    <div className="border-r border-gray-950/5 py-1 px-8 ">
                                        Vu Minh Quy
                                    </div>
                                    <div className="border-r border-gray-950/5 py-1 px-8 ">
                                        0327589638
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="border-r border-gray-950/5 py-1 px-8 ">
                                        903
                                    </div>
                                    <div className="border-r border-gray-950/5 py-1 px-8 ">
                                        Street Minh Khai
                                    </div>
                                    <div className="border-r border-gray-950/5 py-1 px-8 ">
                                        District Hai Ba Trung
                                    </div>
                                    <div className="border-r border-gray-950/5 py-1 px-8 ">
                                        City Ha Noi
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                    </div>
                </div>

                {/* MacBook Section */}
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                        <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                            <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2 w-fit">
                                <div className="">Products</div>
                            </div>
                            <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2">
                                <div className="">2 ITEMS</div>
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
                            {[...Array(2)].map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col w-full gap-0"
                                >
                                    <Horizon />
                                    <div className="flex w-full gap-0">
                                        <Vertical />
                                        <div className="flex border border-gray-950/5 p-2 w-full gap-4 bg-gray-950/2.5 min-w-max">
                                            <div className="flex bg-white h-56 justify-center rounded-lg w-1/5 items-center outline outline-gray-950/5">
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
                                                        <div className="">
                                                            10
                                                        </div>
                                                    </div>
                                                    <div className="font-mono">
                                                        39.000.000 VND
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

                <div className="flex flex-col gap-0">
                    <div className="relative">
                        <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                        <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                            <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2 w-full">
                                <div className="">Bill</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                        <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest  flex gap-4">
                            <div className="flex border-gray-950/5 border-x   w-full flex-col text-gray-500 font-serif ">
                                <div className="flex items-center border-b border-gray-950/5 justify-end">
                                    <div className="border-r border-gray-950/5 py-1 px-8 w-full">
                                        Merchandise Subtotal
                                    </div>
                                    <div className=" border-gray-950/5 py-1 px-8 w-1/2">
                                        50.000.000 VND
                                    </div>
                                </div>
                                <div className="flex items-center border-b border-gray-950/5 justify-end">
                                    <div className="border-r border-gray-950/5 py-1 px-8 w-full">
                                        Shipping Subtotal
                                    </div>
                                    <div className=" border-gray-950/5 py-1 px-8 w-1/2">
                                        100.000 VND
                                    </div>
                                </div>
                                <div className="flex  border-b border-gray-950/5 justify-end">
                                    <div className=" border-gray-950/5 flex    items-center px-8 border-r py-2 w-full ">
                                        Payment Method
                                    </div>
                                    <div className=" border-gray-950/5 px-8 w-1/2 flex  justify-between  bg-gray-950/2.5 items-center">
                                        <div className="font-mono text-sm text-black">
                                            Cash on Delivery
                                        </div>
                                        <ChevronUpDownIcon className="size-5" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end text-amber-900 ">
                                    <div className="border-r border-gray-950/5  px-8 w-full font-bold py-4">
                                        Total Payment
                                    </div>
                                    <div className=" border-gray-950/5 py-1 px-8 w-1/2 font-semibold">
                                        50.100.000 VND
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                    </div>
                </div>

                <div className="text-center relative ">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <div className="text-lg font-medium  flex justify-center w-full">
                        <div className="bg-black text-white px-16 py-2 shadow-inner  hover:text-black hover:bg-gray-950/5 transition duration-300 cursor-pointer tracking-widest font-medium font-serif">
                            Order Now
                        </div>
                    </div>
                    <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                </div>

                {/* Footer Section */}
                <div className="text-center relative h-dvh">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <div className="text-lg w-1/2 font-medium py-2">Hi</div>
                    <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                </div>
            </div>

            {/* Right Decoration */}
            <div className="bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed border-x text-gray-950/5 px-6"></div>
        </main>
    );
};

export default Payment;

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
