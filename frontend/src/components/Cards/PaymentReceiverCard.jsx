import React, { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { EditForm } from '../Others/EditForm';
import { InformationReceiver } from '../Others/InformationReceiver';

const INITIAL_RECEIVER_INFO = {
    name: '',
    phone: '',
    address: {
        number: '',
        street: '',
        district: '',
        districtCode: '',
        province: '',
        provinceCode: '',
        ward: '',
        wardCode: '',
    },
};

const PaymentReceiverCard = () => {
    const getStoredReceiverInfo = () => {
        try {
            const stored = localStorage.getItem('receiverInfo');
            return stored ? JSON.parse(stored) : INITIAL_RECEIVER_INFO;
        } catch {
            return INITIAL_RECEIVER_INFO;
        }
    };

    const [receiverInfo, setReceiverInfo] = useState(getStoredReceiverInfo);
    const [editInfo, setEditInfo] = useState({ ...receiverInfo });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('receiverInfo', JSON.stringify(receiverInfo));
    }, [receiverInfo]);

    const updateEditInfo = (field, value) => {
        setEditInfo((prev) => ({ ...prev, [field]: value }));
    };

    const updateEditAddress = (field, value) => {
        setEditInfo((prev) => ({
            ...prev,
            address: { ...prev.address, [field]: value },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setReceiverInfo(editInfo);
        setIsDialogOpen(false);
    };

    return (
        <div className="flex flex-col gap-0">
            <div className="relative">
                <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                    <div className="flex border-gray-950/5 border-x bg-gray-950/2.5 items-center px-4 py-2 justify-between w-full">
                        <div>Information</div>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger className="focus:outline-none">
                            <div className="flex border-gray-950/5 border-x gap-2 hover:bg-gray-950/2.5 items-center px-4 py-2 focus:outline-none cursor-pointer">
                                <PencilIcon className="size-6" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] px-8">
                            <EditForm
                                editInfo={editInfo}
                                onInputChange={(e) =>
                                    updateEditInfo(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                                onAddressChange={(e) =>
                                    updateEditAddress(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                                onPhoneChange={(value) =>
                                    updateEditInfo('phone', value)
                                }
                                onSubmit={handleSubmit}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <InformationReceiver
                info={receiverInfo}
                onEditClick={() => setIsDialogOpen(true)}
            />
        </div>
    );
};

export default PaymentReceiverCard;
