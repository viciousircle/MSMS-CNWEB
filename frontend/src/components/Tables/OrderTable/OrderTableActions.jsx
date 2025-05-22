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

    return (
        <TableCell className="text-right">
            <ViewDetailsSheet
                orderId={order._id}
                dateOrder={order.dateOrder}
                orderStage={currentStage}
                paymentMethod={order.paymentMethod}
                paymentStatus={order.isPaid ? 'Paid' : 'Unpaid'}
                onStageUpdated={handleStageUpdate}
            />
        </TableCell>
    );
};

export default OrderTableActions;
