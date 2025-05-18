import React from 'react';
import { PaidStatusBadge, StageBadge } from '@/components/Others/StatusBadge';
import {
    ArrowPathRoundedSquareIcon,
    CheckIcon,
    ClockIcon,
    HomeModernIcon,
    PhoneIcon,
    TruckIcon,
    UserIcon,
} from '@heroicons/react/24/outline';

const InfoRow = ({ icon: Icon, text, children }) => (
    <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-gray-500" />
        <div>{text || children}</div>
    </div>
);

const OrderInfoSection = ({ order }) => {
    const shippingAddress = {
        name: 'Alex Smith',
        address: '789 Pine Rd, Springfield, IL 62703',
        phone: '+1 (555) 123-4567',
    };

    return (
        <div className="flex-1 flex flex-col gap-4">
            <div className="border border-gray-200 p-4 rounded-lg h-fit">
                <h3 className="text-base font-medium text-black mb-4">
                    Shipping address
                </h3>
                <div className="flex flex-col gap-4">
                    <InfoRow icon={UserIcon} text={shippingAddress.name} />
                    <InfoRow
                        icon={HomeModernIcon}
                        text={shippingAddress.address}
                    />
                    <InfoRow icon={PhoneIcon} text={shippingAddress.phone} />
                </div>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg h-fit">
                <h3 className="text-base font-medium text-black mb-4">
                    Order Status
                </h3>
                <div className="flex flex-col gap-4">
                    <InfoRow
                        icon={ArrowPathRoundedSquareIcon}
                        children={<StageBadge status={order.stage} />}
                    />
                    <InfoRow
                        icon={TruckIcon}
                        children={<PaidStatusBadge status={order.paidStatus} />}
                    />
                    <InfoRow
                        icon={ClockIcon}
                        text={`Order date: ${order.date}`}
                    />
                    <InfoRow
                        icon={CheckIcon}
                        text="Estimated delivery: 2025-05-10"
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderInfoSection;
