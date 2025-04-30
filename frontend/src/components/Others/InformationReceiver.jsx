import React from 'react';

export const InformationReceiver = ({ info, onEditClick }) => {
    // Check if all fields are empty
    const isAllEmpty = () => {
        const mainFields = [info.name, info.phone];
        const addressFields = [
            info.address.number,
            info.address.street,
            info.address.ward,
            info.address.district,
            info.address.province,
        ];

        return [...mainFields, ...addressFields].every(
            (field) => !field || field.trim() === ''
        );
    };

    return (
        <div className="relative">
            <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
            <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest flex gap-4">
                <div className="flex border-gray-950/5 border-x w-full flex-col text-gray-500 font-serif">
                    {isAllEmpty() ? (
                        <div className="py-4 px-8 text-gray-400 italic text-center w-full">
                            Please provide the receiver information{' '}
                            <span
                                className="text-blue-500 cursor-pointer hover:underline"
                                onClick={onEditClick}
                            >
                                in here
                            </span>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center border-b border-gray-950/5">
                                <div className="border-r border-gray-950/5 py-1 px-8">
                                    {info.name || 'No name provided'}
                                </div>
                                <div className="border-r border-gray-950/5 py-1 px-8">
                                    {info.phone || 'No phone provided'}
                                </div>
                            </div>
                            <div className="flex items-center">
                                {info.address.number ||
                                info.address.street ||
                                info.address.ward ||
                                info.address.district ||
                                info.address.province ? (
                                    <>
                                        <div className="border-r border-gray-950/5 py-1 px-8">
                                            {info.address.number}
                                        </div>
                                        <div className="border-r border-gray-950/5 py-1 px-8">
                                            {info.address.street}
                                        </div>
                                        <div className="border-r border-gray-950/5 py-1 px-8">
                                            {info.address.ward}
                                        </div>
                                        <div className="border-r border-gray-950/5 py-1 px-8">
                                            {info.address.district}
                                        </div>
                                        <div className="border-r border-gray-950/5 py-1 px-8">
                                            {info.address.province}
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-1 px-8 text-gray-400 italic">
                                        Please provide the address{' '}
                                        <span
                                            className="text-blue-500 cursor-pointer hover:underline"
                                            onClick={onEditClick}
                                        >
                                            in here
                                        </span>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
        </div>
    );
};
