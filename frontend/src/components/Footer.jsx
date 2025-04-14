import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="flex  items-center justify-between gap-4 p-3 px-0">
            <div className="col-start-4 row-span-full row-start-1 max-sm:hidden text-gray-300 border-x border-x-current bg-[size:10px_10px] bg-fixed bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] p-4"></div>
            <div>Hi</div>
            <div className="col-start-4 row-span-full row-start-1 max-sm:hidden text-gray-300 border-x border-x-current bg-[size:10px_10px] bg-fixed bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] p-4"></div>
        </div>
    );
};

const CartTotal = () => {
    return (
        <div className=" bg-white border-gray-950/5 border-t w-full bottom-0 fixed  items-center left-0  bg-[image:repeating-linear-gradient(45deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed border-x text-gray-950/5 flex justify-center">
            <div className="flex  justify-center bg-white w-fit border-x">
                <div className=" font-medium text-black py-4 px-8 bg-gray-950/5 ">
                    Total: 312.000.000 VND
                </div>
                <div className="bg-white  text-black border-l border-gray-950/5 cursor-pointer duration-300 hover:bg-black hover:outline hover:text-gray-200  transition  px-16 uppercase tracking-widest font-medium  flex flex-col items-center justify-center">
                    <Link to={'/payment'}>Buy now</Link>
                </div>
            </div>
        </div>
    );
};

export { Footer, CartTotal };
