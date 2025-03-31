import React from "react";
import img2 from "../assets/img2.jpeg";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Decoration from "../components/Decoration";
import { HrBot, HrTop } from "../components/HorizontalLine";
import Body from "@/components/Body";
import { HeaderWithIcon } from "@/components/Header";
import CheckBox from "@/components/Checkbox";
import OptionDrawer from "./OptionDrawer";

const CardProduct = () => (
    <div className="flex flex-col w-full gap-0">
        <BorderRow />
        <div className="flex w-full gap-0">
            <SideBorder />
            <ProductCard />
            <SideBorder />
        </div>
        <BorderRow />
    </div>
);

const ProductCard = () => (
    <div className="flex flex-col border border-gray-950/5 p-2 w-full gap-4 hover:bg-gray-950/2.5 min-w-max">
        <div className="flex bg-white h-64 justify-center rounded-lg w-full items-center outline outline-gray-950/5">
            <img src={img2} alt="MacBook" className="w-64 object-contain" />
        </div>
        <div className="pb-2 flex justify-between items-center">
            <ProductInfo />
            <OptionDrawer />
        </div>
    </div>
);

const GridCard = ({ children }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="text-center relative">
                <hr className="hr-top" />
                <div className="grid grid-cols-1 w-full lg:grid-cols-4 sm:grid-cols-2">
                    {children}
                </div>
                <hr className="hr-bot" />
            </div>
        </div>
    );
};

const LinearCard = ({ children }) => {
    return (
        <div className="text-center relative">
            {/* Top Decorative Line */}
            <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />

            {/* Cards Grid */}
            <div className="grid grid-cols-1 w-full lg:grid-cols-1">
                {children}
            </div>

            {/* Bottom Decorative Line */}
            <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
        </div>
    );
};

function InformationSection() {
    return (
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
    );
}

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

function CardCartItem() {
    return (
        <div className="flex flex-col w-full gap-0">
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
                                <div className="tracking-wider">Quantity</div>
                                <div className="bg-gray-950/2.5 border p-2 rounded-sm">
                                    10
                                </div>
                            </div>
                            <div className="font-mono">39.000.000 VND</div>
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
    );
}

const ProductInfo = () => (
    <div className="flex flex-col gap-2 items-start">
        <div className="font-medium">MacBook Pro</div>
        <div className="text-gray-400 text-xs font-mono">39.000.000</div>
    </div>
);

const BorderRow = () => (
    <div className="flex w-full gap-0">
        <div className="p-2"></div>
        <div className="border-gray-950/5 border-x p-2 w-full"></div>
        <div className="p-2"></div>
    </div>
);
const SideBorder = () => <div className="border-gray-950/5 border-y p-2"></div>;

export { CardProduct, GridCard, LinearCard, CardCartItem, InformationSection };
