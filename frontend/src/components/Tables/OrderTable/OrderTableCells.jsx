import React from 'react';
import { TableCell } from '@/components/ui/table';
import { StageBadge, PaidStatusBadge } from '../../Others/StatusBadge';
import { formatDisplayId } from '/utils/idConverter';
import { formatPrice } from '/utils/formatPrice';
import { ORDER_TABLE_COLUMNS } from '@/constants/orderTableConfig';

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

    const getResponsiveClass = (responsive) => {
        switch (responsive) {
            case 'always-visible':
                return '';
            case 'lg-visible':
                return 'hidden lg:table-cell';
            case 'md-visible':
                return 'hidden md:table-cell';
            default:
                return '';
        }
    };

    return ORDER_TABLE_COLUMNS.map((column, index) => {
        let content;
        switch (column.key) {
            case 'orderStage':
                content = (
                    <div className="flex flex-col items-center gap-1">
                        <StageBadge status={currentStage} />
                    </div>
                );
                break;
            case 'order':
                content = <span className="font-medium">{displayId}</span>;
                break;
            case 'customer':
                content = (
                    <span className="font-medium">{order.customerName}</span>
                );
                break;
            case 'email':
                content = <span>{order.customerEmail}</span>;
                break;
            case 'bill':
                content = (
                    <span className="font-medium text-green-600">
                        {`${formatPrice(order.totalPayment)} VND`}
                    </span>
                );
                break;
            case 'dateOrder':
                content = <span>{order.dateOrder}</span>;
                break;
            case 'payMethod':
                content = <span>{order.paymentMethod}</span>;
                break;
            case 'payStatus':
                content = <PaidStatusBadge status={paymentStatus} />;
                break;
            default:
                content = null;
        }

        return (
            <TableCell
                key={column.key}
                className={`text-${column.align} ${
                    column.width || ''
                } ${getResponsiveClass(column.responsive)}`}
            >
                {content}
            </TableCell>
        );
    });
};

export default OrderTableCells;
