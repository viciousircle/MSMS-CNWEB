import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ViewDetailsSheet } from '../../Others/ViewDetailsSheet';
import { PaidStatusBadge, StageBadge } from '../../Others/StatusBadge';

export const OrderTableRow = ({
    order,
    isSelected,
    onToggleSelection,
    onStageUpdated, // Add this prop
}) => {
    // Extract the current stage (assuming orderStage is an array)
    const currentStage = Array.isArray(order.orderStage)
        ? order.orderStage.slice(-1)[0]?.stage
        : order.orderStage;

    const cells = [
        <StageBadge status={currentStage} />, // Use currentStage here
        order._id,
        order.customerName,
        order.customerEmail,
        `$${order.totalPayment}`,
        order.dateOrder,
        order.paymentMethod,
        <PaidStatusBadge status={order.isPaid ? 'Paid' : 'Unpaid'} />,
    ];

    const handleStageUpdate = (newStage) => {
        onStageUpdated?.(order._id, newStage);
    };

    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center justify-center">
                    <Checkbox
                        className="size-4 bg-white"
                        checked={isSelected}
                        onCheckedChange={onToggleSelection}
                    />
                </div>
            </TableCell>

            {cells.map((content, i) => (
                <TableCell key={i} className="text-center">
                    {i === 2 ? (
                        <span className="font-medium">{content}</span>
                    ) : (
                        content
                    )}
                </TableCell>
            ))}

            <TableCell className="text-right">
                <ViewDetailsSheet
                    orderId={order._id}
                    dateOrder={order.dateOrder}
                    orderStage={currentStage} // Pass currentStage here
                    paymentMethod={order.paymentMethod}
                    paymentStatus={order.isPaid ? 'Paid' : 'Unpaid'}
                    onStageUpdated={handleStageUpdate}
                />
            </TableCell>
        </TableRow>
    );
};
