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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';

const PaymentReceiverCard = () => {
    const [receiverInfo, setReceiverInfo] = useState({
        name: 'Vu Minh Quy',
        phone: '0327589638',
        address: {
            number: '903',
            street: 'Minh Khai',
            district: 'Hai Ba Trung',
            city: 'Ha Noi',
        },
    });

    const [editInfo, setEditInfo] = useState({
        name: receiverInfo.name,
        phone: receiverInfo.phone,
        address: { ...receiverInfo.address },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setEditInfo((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };

    const handlePhoneChange = (value) => {
        setEditInfo((prev) => ({
            ...prev,
            phone: value,
        }));
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
                        <div>Infomation</div>
                    </div>

                    {/* Edit Dialog */}
                    <Dialog>
                        <DialogTrigger className="focus:outline-none">
                            <div className="flex border-gray-950/5 border-x gap-2 hover:bg-gray-950/2.5 items-center px-4 py-2 focus:outline-none cursor-pointer">
                                <PencilIcon className="size-6" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[720px] px-8">
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Edit information</DialogTitle>
                                    <div className="flex flex-col gap-4 mt-4">
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="w-1/4 min-w-[120px] text-left pr-4">
                                                Receiver
                                            </div>
                                            <Input
                                                className="flex-1"
                                                name="name"
                                                value={editInfo.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="w-1/4 min-w-[120px] text-left pr-4">
                                                Phone
                                            </div>
                                            <div className="flex-1">
                                                <InputOTP
                                                    maxLength={10}
                                                    className="w-full"
                                                    value={editInfo.phone}
                                                    onChange={handlePhoneChange}
                                                >
                                                    <InputOTPGroup className="flex-1">
                                                        {[...Array(4)].map(
                                                            (_, i) => (
                                                                <InputOTPSlot
                                                                    key={i}
                                                                    index={i}
                                                                    className="flex-1"
                                                                />
                                                            )
                                                        )}
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator />
                                                    <InputOTPGroup className="flex-1">
                                                        {[...Array(3)].map(
                                                            (_, i) => (
                                                                <InputOTPSlot
                                                                    key={i + 4}
                                                                    index={
                                                                        i + 4
                                                                    }
                                                                    className="flex-1"
                                                                />
                                                            )
                                                        )}
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator />
                                                    <InputOTPGroup className="flex-1">
                                                        {[...Array(3)].map(
                                                            (_, i) => (
                                                                <InputOTPSlot
                                                                    key={i + 7}
                                                                    index={
                                                                        i + 7
                                                                    }
                                                                    className="flex-1"
                                                                />
                                                            )
                                                        )}
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="w-1/4 min-w-[120px] text-left pr-4">
                                                Address
                                            </div>
                                            <div className="grid grid-cols-4 gap-2 flex-1">
                                                <Input
                                                    placeholder="Number"
                                                    className="w-full"
                                                    name="number"
                                                    value={
                                                        editInfo.address.number
                                                    }
                                                    onChange={
                                                        handleAddressChange
                                                    }
                                                />
                                                <Input
                                                    placeholder="Street"
                                                    className="w-full"
                                                    name="street"
                                                    value={
                                                        editInfo.address.street
                                                    }
                                                    onChange={
                                                        handleAddressChange
                                                    }
                                                />
                                                <Input
                                                    placeholder="District"
                                                    className="w-full"
                                                    name="district"
                                                    value={
                                                        editInfo.address
                                                            .district
                                                    }
                                                    onChange={
                                                        handleAddressChange
                                                    }
                                                />
                                                <Input
                                                    placeholder="City"
                                                    className="w-full"
                                                    name="city"
                                                    value={
                                                        editInfo.address.city
                                                    }
                                                    onChange={
                                                        handleAddressChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <DialogDescription className="mt-4">
                                        Make changes to your profile here. Click
                                        save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button type="submit" className="w-full">
                                        Save changes
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Information Display Section */}
            <div className="relative">
                <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest flex gap-4">
                    <div className="flex border-gray-950/5 border-x w-full flex-col text-gray-500 font-serif">
                        <div className="flex items-center border-b border-gray-950/5">
                            <div className="border-r border-gray-950/5 py-1 px-8">
                                {receiverInfo.name}
                            </div>
                            <div className="border-r border-gray-950/5 py-1 px-8">
                                {receiverInfo.phone}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="border-r border-gray-950/5 py-1 px-8">
                                {receiverInfo.address.number}
                            </div>
                            <div className="border-r border-gray-950/5 py-1 px-8">
                                Street {receiverInfo.address.street}
                            </div>
                            <div className="border-r border-gray-950/5 py-1 px-8">
                                District {receiverInfo.address.district}
                            </div>
                            <div className="border-r border-gray-950/5 py-1 px-8">
                                City {receiverInfo.address.city}
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
            </div>
        </div>
    );
};

export default PaymentReceiverCard;
