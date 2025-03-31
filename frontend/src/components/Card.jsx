import React from "react";
import img2 from "../assets/img2.jpeg";

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

export { CardProduct, GridCard };
