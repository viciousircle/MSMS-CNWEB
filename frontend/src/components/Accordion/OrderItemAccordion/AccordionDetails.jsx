import React from 'react';
import OrderItemsSection from './OrderItemsSection';
import CancelOrderSection from './CancelOrderSection';
import OrderInfoSection from './OrderInfoSection';

const AccordionDetails = ({ order }) => {
    const handleCancelOrder = () => {
        console.log(`Canceling order #${order._id}`);
    };

    return (
        <div className="px-4 py-2 flex flex-col gap-4">
            <div className="flex gap-4">
                <OrderItemsSection items={order.orderItems} />
                <OrderInfoSection order={order} />
            </div>
            {order.currentStage.toLowerCase() === 'new' && (
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
