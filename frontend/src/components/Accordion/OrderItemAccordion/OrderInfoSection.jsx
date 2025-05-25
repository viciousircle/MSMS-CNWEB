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
        <div className="text-sm break-words whitespace-normal">
            {text || children}
        </div>
    </div>
);

// Helper to calculate estimated delivery date
const getEstimatedDelivery = (orderDate) => {
    if (!orderDate) return 'N/A';
    let date = new Date(orderDate);
    if (isNaN(date)) {
        // Try Date.parse for formatted strings
        const parsed = Date.parse(orderDate);
        if (!isNaN(parsed)) {
            date = new Date(parsed);
        } else {
            return 'N/A';
        }
    }
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
};

const OrderInfoSection = ({ order }) => {
    return (
        <div className="flex-1/2 flex flex-col gap-4">
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
                        text={`Estimated delivery: ${getEstimatedDelivery(
                            order.createdAtRaw ||
                                order.createdAt ||
                                order.orderDate
                        )}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderInfoSection;
