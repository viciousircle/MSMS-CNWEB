import React from 'react';

export const InformationReceiver = ({ info }) => (
    <div className="relative">
        <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
        <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest flex gap-4">
            <div className="flex border-gray-950/5 border-x w-full flex-col text-gray-500 font-serif">
                <div className="flex items-center border-b border-gray-950/5">
                    <div className="border-r border-gray-950/5 py-1 px-8">
                        {info.name}
                    </div>
                    <div className="border-r border-gray-950/5 py-1 px-8">
                        {info.phone}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="border-r border-gray-950/5 py-1 px-8">
                        {info.address.number}
                    </div>
                    <div className="border-r border-gray-950/5 py-1 px-8">
                        Street {info.address.street}
                    </div>
                    <div className="border-r border-gray-950/5 py-1 px-8">
                        Ward {info.address.ward}
                    </div>
                    <div className="border-r border-gray-950/5 py-1 px-8">
                        District {info.address.district}
                    </div>
                    <div className="border-r border-gray-950/5 py-1 px-8">
                        Province {info.address.province}
                    </div>
                </div>
            </div>
        </div>
        <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
    </div>
);
