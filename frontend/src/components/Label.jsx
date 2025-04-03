import React from "react";
import {
    ArchiveBoxIcon,
    ArrowLongRightIcon,
    ShieldCheckIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    SparklesIcon,
    StarIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";

import img2 from "../assets/img2.jpeg";
const Label = ({ titles = [] }) => {
    return (
        <div className="relative">
            <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
            <div className="flex gap-4 px-4">
                {titles.map((title, index) => (
                    <div
                        key={index}
                        className="text-gray-700 text-pretty font-medium font-mono tracking-widest uppercase flex"
                    >
                        <div className="flex border-gray-950/5 border-x bg-gray-950/2.5 items-center px-4 py-2 justify-between w-full">
                            <div>{title}</div>
                        </div>
                    </div>
                ))}
            </div>
            <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
        </div>
    );
};

export default Label;

const OrderStatusGroup = () => {
    return (
        <div className="relative">
            <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />

            <h1 className="text-5xl text-pretty flex max-w-none  tracking-widest whitespace-nowrap items-center justify-center gap-10">
                <div className="border-x border-gray-950/5 flex items-center  flex-col">
                    <div className="text-lg font-mono bg-gray-950/2.5 border-b w-full text-center border-gray-950/5 ">
                        <div>0</div>
                    </div>
                    <div className=" hover:bg-gray-950/2.5">
                        <ShieldCheckIcon className="size-20 py-1 px-2" />
                    </div>
                </div>
                <div className="border-x border-gray-950/5 flex items-center flex-col">
                    <div className="text-lg font-mono bg-gray-950/2.5 border-b w-full text-center border-gray-950/5 ">
                        <div>0</div>
                    </div>
                    <div className="hover:bg-gray-950/2.5 ">
                        <ArchiveBoxIcon className="size-20 py-1 px-2" />
                    </div>
                </div>
                <div className="border-x border-gray-950/5 flex items-center flex-col">
                    <div className="text-lg bg-gray-950/2.5 border-b w-full text-center border-gray-950/5 font-mono">
                        <div>90</div>
                    </div>
                    <div className="hover:bg-gray-950/2.5">
                        <TruckIcon className="size-20 py-1 px-2" />
                    </div>
                </div>
                <div className="border-x border-gray-950/5 flex items-center  flex-col">
                    <div className="text-lg font-mono bg-gray-950/2.5 border-b w-full text-center border-gray-950/5 ">
                        <div>0</div>
                    </div>
                    <div className="hover:bg-gray-950/2.5">
                        <SparklesIcon className="size-20 py-1 px-2" />
                    </div>
                </div>
            </h1>
            <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
        </div>
    );
};

const OrderSorter = () => {
    return (
        <div className="flex flex-col gap-0">
            <div className="relative">
                <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-0">
                    <div className="flex border-gray-950/5 border-x  bg-gray-950/2.5 items-center px-4 py-2 w-1/3 justify-between">
                        <div className="">Order history </div>
                    </div>
                    <div className="flex border-gray-950/5 border-r  hover:bg-gray-950/2.5 items-center px-4 py-2  justify-center w-full">
                        <div className="">All</div>
                    </div>
                </div>
            </div>
            <div className="relative">
                <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                    <div className="flex border-gray-950/5 border-x  hover:bg-gray-950/2.5 items-center px-4 py-2  w-full justify-center">
                        <div className="">To confirm </div>
                    </div>
                    <div className="flex border-gray-950/5 border-x  hover:bg-gray-950/2.5 items-center px-4 py-2  w-full justify-center">
                        <div className="">To prepare </div>
                    </div>
                    <div className="flex border-gray-950/5 border-x  hover:bg-gray-950/2.5 items-center px-4 py-2  w-full justify-center">
                        <div className="">To delivery </div>
                    </div>
                    <div className="flex border-gray-950/5 border-x  hover:bg-gray-950/2.5 items-center px-4 py-2  w-full justify-center">
                        <div className="">To rate</div>
                    </div>
                    <div className="flex border-gray-950/5 border-x  hover:bg-gray-950/2.5 items-center px-4 py-2  w-full justify-center">
                        <div className="">Cancelled </div>
                    </div>
                    <div className="flex border-gray-950/5 border-x  hover:bg-gray-950/2.5 items-center px-4 py-2  w-full justify-center">
                        <div className="">Return refund </div>
                    </div>
                </div>
                <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
            </div>
        </div>
    );
};

const OrderCard = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />

                <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                    <div className="flex border-gray-950/5 border-x gap-2 items-center px-4 py-2 bg-emerald-50">
                        <div className="text-emerald-600">Rated</div>
                    </div>
                    <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2 w-fit">
                        <div className="">12/12/2025</div>
                    </div>
                    <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2">
                        <div className="">
                            <ArrowLongRightIcon className="size-6" />
                        </div>
                    </div>
                    <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2">
                        <div className=""> 23/03/2025</div>
                    </div>
                    <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2">
                        <div className="">4 ITEMS</div>
                    </div>
                    <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2">
                        <div className="">34.000.000 VND</div>
                    </div>

                    <div className="flex border-gray-950/5 border-x gap-2 items-center px-4 py-2 bg-gray-950/2.5">
                        <div className="text-gray-300 flex gap-2">
                            <SparklesIcon className="size-6 text-yellow-600" />
                            <SparklesIcon className="size-6 text-yellow-600" />
                            <SparklesIcon className="size-6 text-yellow-600" />
                            <SparklesIcon className="size-6" />
                            <SparklesIcon className="size-6" />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
            </div>

            {/* Product Grid */}
            <div className="text-center relative">
                {/* Top Decorative Line */}
                <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />

                {/* Cards Grid */}
                <div className="grid grid-cols-1 w-full lg:grid-cols-4">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="flex flex-col w-full gap-0">
                            <Horizon />
                            <div className="flex w-full gap-0">
                                <Vertical />
                                <div className="flex border border-gray-950/5 p-2 w-full gap-4 hover:bg-gray-950/2.5 min-w-max">
                                    <div className="flex bg-white h-56  justify-center rounded-lg w-full items-center outline outline-gray-950/5">
                                        <img
                                            src={img2}
                                            alt="MacBook"
                                            className="w-64 object-contain"
                                        />
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
    );
};

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

export { Label, OrderStatusGroup, OrderSorter, OrderCard };
