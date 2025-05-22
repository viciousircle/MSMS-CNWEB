import React from 'react';
import { formatDisplayId } from '/utils/idConverter';
import { PaidStatusBadge, StageBadge } from './StatusBadge';

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between">
        <span className="font-medium text-gray-700">{label}:</span>
        <span className="text-right">{value}</span>
    </div>
);

const InfoSection = ({ title, children }) => (
    <div className="border border-gray-200 rounded-lg p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-800 text-center">
            {title}
        </h3>
        {children}
    </div>
);

const ViewDetailsInfo = ({
    orderDetails,
    dateOrder,
    paymentMethod,
    orderStage,
    paymentStatus,
}) => {
    return (
        <div className="flex flex-col gap-6 mt-6">
            <InfoSection title="Receiver Information">
                <InfoRow
                    label="Full Name"
                    value={orderDetails.receiverInfo.name}
                />
                <InfoRow
                    label="Phone"
                    value={orderDetails.receiverInfo.phone}
                />
                <InfoRow
                    label="Address"
                    value={orderDetails.receiverInfo.address}
                />
            </InfoSection>

            <InfoSection title="Order Summary">
                <InfoRow
                    label="Order ID"
                    value={formatDisplayId(orderDetails.id, 'ORD-')}
                />
                <InfoRow label="Date" value={dateOrder} />
                <InfoRow label="Payment Method" value={paymentMethod} />
                <InfoRow
                    label="Stage"
                    value={<StageBadge status={orderStage} />}
                />
                <InfoRow
                    label="Payment Status"
                    value={<PaidStatusBadge status={paymentStatus} />}
                />
            </InfoSection>
        </div>
    );
};

export default ViewDetailsInfo;
