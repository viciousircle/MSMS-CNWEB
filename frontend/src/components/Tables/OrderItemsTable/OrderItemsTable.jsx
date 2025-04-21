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
        (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity),
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
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-center">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center font-medium">
                            {item._id}
                        </TableCell>
                        <TableCell className="text-center">
                            {item.name}
                        </TableCell>
                        <TableCell className="text-center">
                            {item.color}
                        </TableCell>
                        <TableCell className="text-center">
                            {item.quantity}
                        </TableCell>
                        <TableCell className="text-center text-green-600">
                            {formatPrice(
                                parseFloat(item.price) * parseInt(item.quantity)
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4} className="text-center font-medium">
                        Merchandise Subtotal
                    </TableCell>
                    <TableCell className="text-center font-bold text-green-700">
                        {formatPrice(subtotal)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4} className="text-center font-medium">
                        Shipping Subtotal
                    </TableCell>
                    <TableCell className="text-center font-bold text-green-700">
                        {shippingSubtotal}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4} className="text-center font-medium">
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
