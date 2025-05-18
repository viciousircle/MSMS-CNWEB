import React from 'react';
import CancelOrderDialog from '@/components/Others/CancelOrderDialog';

const CancelOrderSection = ({ orderId, onCancel }) => {
    return (
        <div className="bg-red-50 p-4 rounded-lg w-fit flex  items-center gap-8 ">
            <div className="text-red-500 font-medium">
                Want to cancel your order?
            </div>
            <CancelOrderDialog orderId={orderId} onCancel={onCancel} />
        </div>
    );
};

export default CancelOrderSection;
