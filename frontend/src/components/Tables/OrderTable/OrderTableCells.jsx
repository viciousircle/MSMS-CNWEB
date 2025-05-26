import React from 'react';
import { TableCell } from '@/components/ui/table';
import { StageBadge, PaidStatusBadge } from '../../Others/StatusBadge';
import { formatDisplayId } from '/utils/idConverter';
import { formatPrice } from '/utils/formatPrice';

const OrderTableCells = ({ order }) => {
    const currentStage = Array.isArray(order.orderStage)
        ? order.orderStage.slice(-1)[0]?.stage
        : order.orderStage;

    const displayId = formatDisplayId(order._id, 'ORD-');

    const cells = [
        <StageBadge status={currentStage} />,
        displayId,
        order.customerName,
        order.customerEmail,
        `${formatPrice(order.totalPayment)} VND`,
        order.dateOrder,
        order.paymentMethod,
        <PaidStatusBadge status={order.isPaid ? 'Paid' : 'Unpaid'} />,
    ];

    return cells.map((content, i) => (
        <TableCell key={i} className="text-center">
            {i === 2 ? <span className="font-medium">{content}</span> : content}
        </TableCell>
    ));
};

export default OrderTableCells;
