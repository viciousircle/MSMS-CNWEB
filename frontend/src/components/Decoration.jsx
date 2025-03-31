import React from "react";

const Decoration = () => {
    return (
        <div className="bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed border-x text-gray-950/5 px-6"></div>
    );
};
const BorderRow = () => (
    <div className="flex w-full gap-0">
        <div className="p-2"></div>
        <div className="border-gray-950/5 border-x p-2 w-full"></div>
        <div className="p-2"></div>
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
            <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />

            <div className="grid grid-cols-1 w-full lg:grid-cols-1">
                {children}
            </div>

            <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
        </div>
    );
};

export { Decoration, BorderRow, GridCard, LinearCard };
