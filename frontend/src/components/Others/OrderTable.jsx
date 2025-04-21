import React, { useMemo, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ViewDetailsSheet } from './ViewDetailsSheet';

import { PaidStatusBadge, StageBadge } from './StatusBadge';

const COLUMN_WIDTHS = {
    checkbox: 'w-[40px]',
    stage: 'w-[180px]',
    order: 'w-[120px]',
    customer: 'w-[180px]',
    phone: 'w-[120px]',
    bill: 'w-[250px]',
    dateOrder: 'w-[120px]',
    payMethod: 'w-[120px]',
    paidStatus: 'w-[120px]',
    details: 'w-[120px]',
};

const TableHeaderCell = ({ children, className = '', align = 'center' }) => (
    <TableHead className={`text-${align} ${className}`}>{children}</TableHead>
);

/**
 * Order Table Component
 * @param {{ orders: Array<{
 *   _id: string,
 *   stageOrder: string,
 *   customerName: string,
 *   customerPhone: string,
 *   totalBill: number|string,
 *   paymentMethod: string,
 *   paymentStatus: string,
 *  dateOrder: string,
 * }>}} props
 */
export const OrderTable = ({ orders }) => {
    const [selectedRows, setSelectedRows] = useState(new Set());
    const totalBill = useMemo(
        () =>
            orders
                .reduce((sum, { totalBill }) => sum + parseFloat(totalBill), 0)
                .toFixed(2),
        [orders]
    );

    const toggleRowSelection = (orderId) => {
        const newSelection = new Set(selectedRows);
        if (newSelection.has(orderId)) {
            newSelection.delete(orderId);
        } else {
            newSelection.add(orderId);
        }
        setSelectedRows(newSelection);
    };

    const toggleAllRows = () => {
        if (selectedRows.size === orders.length) {
            setSelectedRows(new Set());
        } else {
            setSelectedRows(new Set(orders.map((order) => order.order)));
        }
    };

    return (
        <Table>
            <TableHeader className="bg-gray-100">
                <TableRow>
                    <TableHeaderCell className={COLUMN_WIDTHS.checkbox}>
                        <Checkbox
                            className="size-4 bg-white"
                            checked={
                                selectedRows.size === orders.length &&
                                orders.length > 0
                            }
                            onCheckedChange={toggleAllRows}
                        />
                    </TableHeaderCell>
                    <TableHeaderCell className={COLUMN_WIDTHS.stage}>
                        Stage
                    </TableHeaderCell>
                    <TableHeaderCell className={COLUMN_WIDTHS.order}>
                        Order
                    </TableHeaderCell>
                    <TableHeaderCell className={COLUMN_WIDTHS.customer}>
                        Customer
                    </TableHeaderCell>
                    <TableHeaderCell className={COLUMN_WIDTHS.phone}>
                        Phone
                    </TableHeaderCell>
                    <TableHeaderCell className={COLUMN_WIDTHS.bill}>
                        Bill
                    </TableHeaderCell>
                    <TableHeaderCell className={COLUMN_WIDTHS.dateOrder}>
                        Date
                    </TableHeaderCell>
                    <TableHeaderCell className={COLUMN_WIDTHS.payMethod}>
                        Pay Method
                    </TableHeaderCell>
                    <TableHeaderCell className={COLUMN_WIDTHS.paidStatus}>
                        Paid Status
                    </TableHeaderCell>
                    <TableHeaderCell
                        className={`${COLUMN_WIDTHS.details} text-right pr-4`}
                    >
                        Details
                    </TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {orders.map((order) => {
                    const {
                        _id: orderId,
                        stageOrder: stage,
                        customerName,
                        customerPhone,
                        totalBill: totalAmount,
                        paymentMethod,
                        paymentStatus,
                        dateOrder: dateOrder,
                    } = order;

                    return (
                        <TableRow key={orderId}>
                            <TableCell>
                                <div className="flex items-center justify-center">
                                    <Checkbox
                                        className="size-4 bg-white"
                                        checked={selectedRows.has(orderId)}
                                        onCheckedChange={() =>
                                            toggleRowSelection(orderId)
                                        }
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <StageBadge status={stage} />
                            </TableCell>
                            <TableCell className="text-center font-medium">
                                {orderId}
                            </TableCell>
                            <TableCell className="text-center">
                                {customerName}
                            </TableCell>
                            <TableCell className="text-center">
                                {customerPhone}
                            </TableCell>
                            <TableCell className="text-center">
                                ${totalAmount}
                            </TableCell>
                            <TableCell className="text-center">
                                {dateOrder}
                            </TableCell>
                            <TableCell className="text-center">
                                {paymentMethod}
                            </TableCell>
                            <TableCell className="text-center">
                                <PaidStatusBadge status={paymentStatus} />
                            </TableCell>
                            <TableCell className="text-right">
                                <ViewDetailsSheet
                                    orderId={orderId}
                                    dateOrder={dateOrder}
                                    stageOrder={stage}
                                    paymentMethod={paymentMethod}
                                    paymentStatus={paymentStatus}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell />
                    <TableCell className="text-center font-medium">
                        Total
                    </TableCell>
                    <TableCell colSpan={3} />
                    <TableCell className="text-center font-medium">
                        ${totalBill}
                    </TableCell>
                    <TableCell colSpan={4} />
                </TableRow>
            </TableFooter>
        </Table>
    );
};
