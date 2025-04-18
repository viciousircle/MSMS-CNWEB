import React from 'react';
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

export const OrderTable = ({ orders }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.order}>
                        <TableCell className="font-medium">
                            {order.order}
                        </TableCell>
                        <TableCell>{order.paymentStatus}</TableCell>
                        <TableCell>{order.paymentMethod}</TableCell>
                        <TableCell className="text-right">
                            {order.totalAmount}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};
