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
    return (
        <div className="flex-1 flex flex-col gap-4">
            <div className="border border-gray-200 p-4 rounded-lg h-fit">
                <h3 className="text-base font-medium text-black mb-4">
                    Shipping address
                </h3>
                <div className="flex flex-col gap-4">
                    <InfoRow icon={UserIcon} text={order.receiverName} />
                    <InfoRow
                        icon={HomeModernIcon}
                        text={order.receiverAddress}
                    />
                    <InfoRow icon={PhoneIcon} text={order.receiverPhone} />
                </div>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg h-fit">
                <h3 className="text-base font-medium text-black mb-4">
                    Order Status
                </h3>
                <div className="flex flex-col gap-4">
                    <InfoRow
                        icon={ArrowPathRoundedSquareIcon}
                        children={<StageBadge status={order.currentStage} />}
                    />
                    <InfoRow
                        icon={TruckIcon}
                        children={
                            <PaidStatusBadge
                                status={order.isPaid ? 'Paid' : 'Unpaid'}
                            />
                        }
                    />
                    <InfoRow
                        icon={ClockIcon}
                        text={`Order date: ${order.createdAt}`}
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
