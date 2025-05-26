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
import { formatDisplayId } from '/utils/idConverter';
import { formatPrice } from '/utils/formatPrice';
import { ORDER_CONSTANTS } from '@/constants/order.constants';

export const OrderItemsTable = ({ items }) => {
    const subtotal = items.reduce(
        (sum, item) =>
            sum + parseFloat(item.itemAmount.replace(/[^\d.-]/g, '')),
        0
    );
    const shipping = ORDER_CONSTANTS.DEFAULT_SHIPPING_COST;
    const total = subtotal + shipping;

    return (
        <Table>
            <TableCaption>List of items in the order</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center w-[100px]">
                        Item
                    </TableHead>
                    <TableHead className="text-left">Name</TableHead>
                    <TableHead className="text-center">Color</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-center">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center font-medium">
                            {formatDisplayId(item.itemId, 'ITEM-')}
                        </TableCell>
                        <TableCell className="text-left">
                            {item.itemName}
                        </TableCell>
                        <TableCell className="text-center">
                            {item.itemColor}
                        </TableCell>
                        <TableCell className="text-center">
                            {item.itemQuantity}
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                            {`${formatPrice(item.itemAmount)} VND`}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4} className="text-left font-medium">
                        Merchandise Subtotal
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-700">
                        {`${formatPrice(subtotal)} VND`}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4} className="text-left font-medium">
                        Shipping Subtotal
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-700">
                        {`${formatPrice(shipping)} VND`}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4} className="text-left font-medium">
                        Total Payment
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-700">
                        {`${formatPrice(total)} VND`}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};
