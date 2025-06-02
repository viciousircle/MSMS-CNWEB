import React from 'react';
import { TableCell } from '@/components/ui/table';
import { ViewDetailsSheet } from '../../Others/ViewDetailsSheet';

const OrderTableActions = ({ order, onStageUpdated }) => {
    const currentStage = Array.isArray(order.orderStage)
        ? order.orderStage.slice(-1)[0]?.stage
        : order.orderStage;

    const handleStageUpdate = (newStage) => {
        onStageUpdated?.(order._id, { orderStage: newStage });
    };

    const handlePaymentStatusUpdate = (newStatus) => {
        onStageUpdated?.(order._id, {
            isPaid: newStatus === 'Paid',
            // Include other fields that might be needed for the update
            _id: order._id,
            orderStage: order.orderStage,
            // Add any other fields that your backend might expect
        });
    };

    return (
        <TableCell className="text-center">
            <ViewDetailsSheet
                orderId={order._id}
                dateOrder={order.dateOrder}
                orderStage={currentStage}
                paymentMethod={order.paymentMethod}
                paymentStatus={order.isPaid ? 'Paid' : 'Unpaid'}
                onStageUpdated={handleStageUpdate}
                onPaymentStatusUpdated={handlePaymentStatusUpdate}
            />
        </TableCell>
    );
};

export default OrderTableActions;
