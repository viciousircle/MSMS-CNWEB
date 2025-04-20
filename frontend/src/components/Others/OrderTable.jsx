import React, { useMemo } from 'react';
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
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Select } from '@/components/ui/select'; // Or your select component

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import { PaidStatusBadge, StageBadge } from './StatusBadge';

const COLUMN_WIDTHS = {
    checkbox: 'w-[40px]',
    stage: 'w-[180px]',
    order: 'w-[120px]',
    customer: 'w-[180px]',
    phone: 'w-[120px]',
    bill: 'w-[250px]',
    items: 'w-[120px]',
    payMethod: 'w-[120px]',
    paidStatus: 'w-[120px]',
    details: 'w-[120px]',
};

const ViewDetailsSheet = ({ orderId }) => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="link" className="cursor-pointer px-0">
                <span className="flex items-center gap-2">
                    View <ArrowUpRight className="h-4 w-4" />
                </span>
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Order #{orderId} Details</SheetTitle>
                <SheetDescription>
                    Here you can see all information about the selected order.
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
);

const TableHeaderCell = ({ children, className = '', align = 'center' }) => (
    <TableHead className={`text-${align} ${className}`}>{children}</TableHead>
);

/**
 * Order Table Component
 * @param {{ orders: Array<{
 *   order: string,
 *   stage: string,
 *   customerName: string,
 *   customerPhone: string,
 *   totalAmount: number|string,
 *   paymentMethod: string,
 *   paymentStatus: string
 * }>}} props
 */
export const OrderTable = ({ orders }) => {
    const totalAmount = useMemo(
        () =>
            orders
                .reduce(
                    (sum, { totalAmount }) => sum + parseFloat(totalAmount),
                    0
                )
                .toFixed(2),
        [orders]
    );

    return (
        <Table>
            <TableHeader className="bg-gray-100">
                <TableRow>
                    <TableHeaderCell className={COLUMN_WIDTHS.checkbox}>
                        <Checkbox className="size-4 bg-white" />
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
                    <TableHeaderCell className={COLUMN_WIDTHS.items}>
                        Items
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
                        order: orderId,
                        stage,
                        customerName,
                        customerPhone,
                        totalAmount,
                        paymentMethod,
                        paymentStatus,
                    } = order;

                    return (
                        <TableRow key={orderId}>
                            <TableCell>
                                <Checkbox className="size-4 bg-white" />
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
                            <TableCell className="text-center">1</TableCell>
                            <TableCell className="text-center">
                                {paymentMethod}
                            </TableCell>
                            <TableCell className="text-center">
                                <PaidStatusBadge status={paymentStatus} />
                            </TableCell>
                            <TableCell className="text-right">
                                <ViewDetailsSheet orderId={orderId} />
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
                        ${totalAmount}
                    </TableCell>
                    <TableCell colSpan={4} />
                </TableRow>
            </TableFooter>
        </Table>
    );
};
