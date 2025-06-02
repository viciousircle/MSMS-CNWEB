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

    const paymentStatus =
        typeof order.isPaid === 'boolean'
            ? order.isPaid
                ? 'Paid'
                : 'Unpaid'
            : order.isPaid;

    // Define cells with responsive visibility, matching header order
    const cells = [
        // Order ID (always visible on md+, shown under stage on mobile)
        <span className="font-medium">{displayId}</span>,
        // Stage (always visible)
        <div className="flex flex-col items-center gap-1">
            <StageBadge status={currentStage} />
            <span className="text-xs text-gray-500 md:hidden">{displayId}</span>
        </div>,
        // Customer (md+)
        <span className="hidden md:inline font-medium">
            {order.customerName}
        </span>,
        // Email (md+)
        <span className="hidden md:inline">{order.customerEmail}</span>,
        // Total (always visible)
        <div className="flex flex-col items-center">
            <span className="font-medium text-green-600">{`${formatPrice(
                order.totalPayment
            )} VND`}</span>
            <span className="text-xs text-gray-500 md:hidden">
                {order.paymentMethod}
            </span>
        </div>,
        // Date (md+)
        <span className="hidden md:inline">{order.dateOrder}</span>,
        // Pay Method (md+)
        <span className="hidden md:inline">{order.paymentMethod}</span>,
        // Pay Status (always visible)
        <PaidStatusBadge status={paymentStatus} />,
    ];

    return cells.map((content, i) => (
        <TableCell
            key={i}
            className={`text-center ${i === 0 ? 'w-[120px]' : ''} ${
                i === 1 ? 'w-[120px] md:w-[180px]' : ''
            } ${i === 4 ? 'w-[150px] md:w-[250px]' : ''}`}
        >
            {content}
        </TableCell>
    ));
};

export default OrderTableCells;
