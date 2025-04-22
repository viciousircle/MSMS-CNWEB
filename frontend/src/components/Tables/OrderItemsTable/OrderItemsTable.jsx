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

const formatPrice = (price) => `$${price.toFixed(2)}`;

export const OrderItemsTable = ({ items, shippingSubtotal }) => {
    const subtotal = items.reduce(
        (sum, item) => sum + parseFloat(item.itemAmount.replace('$', '')),
        0
    );
    const shipping = parseFloat(shippingSubtotal.replace('$', ''));
    const total = subtotal + shipping;

    return (
        <Table>
            <TableCaption>List of items in the order</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center w-[100px]">
                        Item
                    </TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Color</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-center">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center font-medium">
                            {item.itemId}
                        </TableCell>
                        <TableCell className="text-center">
                            {item.itemName}
                        </TableCell>
                        <TableCell className="text-center">
                            {item.itemColor}
                        </TableCell>
                        <TableCell className="text-center">
                            {item.itemQuantity}
                        </TableCell>
                        <TableCell className="text-center text-green-600">
                            {item.itemAmount}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4} className="text-left font-medium">
                        Merchandise Subtotal
                    </TableCell>
                    <TableCell className="text-center font-bold text-green-700">
                        {formatPrice(subtotal)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4} className="text-left font-medium">
                        Shipping Subtotal
                    </TableCell>
                    <TableCell className="text-center font-bold text-green-700">
                        ${shippingSubtotal}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4} className="text-left font-medium">
                        Total Payment
                    </TableCell>
                    <TableCell className="text-center font-bold text-green-700">
                        {formatPrice(total)}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};
