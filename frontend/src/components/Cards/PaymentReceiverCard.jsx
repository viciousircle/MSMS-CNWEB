import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PencilIcon } from '@heroicons/react/24/outline';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';

import { EditForm } from '../Others/EditForm';
import { InformationReceiver } from '../Others/InformationReceiver';

const INITIAL_RECEIVER_INFO = {
    name: 'Vu Minh Quy',
    phone: '0327589638',
    address: {
        number: '903',
        street: 'Minh Khai',
        district: 'Hai Ba Trung',
        districtCode: '',
        province: 'Hanoi',
        provinceCode: '',
        ward: '',
        wardCode: '',
    },
};

const PaymentReceiverCard = () => {
    const [receiverInfo, setReceiverInfo] = useState(INITIAL_RECEIVER_INFO);
    const [editInfo, setEditInfo] = useState({ ...INITIAL_RECEIVER_INFO });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setEditInfo((prev) => ({
            ...prev,
            address: { ...prev.address, [name]: value },
        }));
    };

    const handlePhoneChange = (value) => {
        setEditInfo((prev) => ({ ...prev, phone: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setReceiverInfo({ ...editInfo });
        // You might want to add API call here to save the data
    };

    return (
        <div className="flex flex-col gap-0">
            {/* Header Section */}
            <div className="relative">
                <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                    <div className="flex border-gray-950/5 border-x bg-gray-950/2.5 items-center px-4 py-2 justify-between w-full">
                        <div>Information</div>
                    </div>

                    {/* Edit Dialog */}
                    <Dialog>
                        <DialogTrigger className="focus:outline-none">
                            <div className="flex border-gray-950/5 border-x gap-2 hover:bg-gray-950/2.5 items-center px-4 py-2 focus:outline-none cursor-pointer">
                                <PencilIcon className="size-6" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[1200px] px-8">
                            <EditForm
                                editInfo={editInfo}
                                onInputChange={handleInputChange}
                                onAddressChange={handleAddressChange}
                                onPhoneChange={handlePhoneChange}
                                onSubmit={handleSubmit}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <InformationReceiver info={receiverInfo} />
        </div>
    );
};

export default PaymentReceiverCard;
