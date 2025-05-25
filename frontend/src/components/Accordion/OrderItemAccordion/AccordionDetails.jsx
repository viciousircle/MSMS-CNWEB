import React from 'react';
import OrderItemsSection from './OrderItemsSection';
import CancelOrderSection from './CancelOrderSection';
import OrderInfoSection from './OrderInfoSection';

const AccordionDetails = ({ order, refetchOrders }) => {
    const handleCancelOrder = () => {
        refetchOrders(); // Trigger refresh after cancellation
    };

    return (
        <div className="px-4 py-2 flex flex-col gap-4">
            <div className="flex gap-4">
                <div className="flex-[3] min-w-0">
                    <OrderItemsSection items={order.orderItems} />
                </div>
                <div className="flex-[1] min-w-0">
                    <OrderInfoSection order={order} />
                </div>
            </div>
            {['New', 'Prepare'].includes(order.currentStage) && (
                <div className="flex justify-end">
                    <CancelOrderSection
                        orderId={order._id}
                        onCancel={handleCancelOrder}
                    />
                </div>
            )}
        </div>
    );
};

export default AccordionDetails;
