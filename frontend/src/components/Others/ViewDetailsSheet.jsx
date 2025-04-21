import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
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
import { PaidStatusBadge, StageBadge } from './StatusBadge';

// Assuming this is imported from your mock file
const ORDER_DETAILS = [
    {
        '_id': 'INV001',
        'receiverName': 'Vicky Noa',
        'receiverPhone': '0327 - 589 - 638',
        'address': '3172 Minh khai',
        'items': [
            {
                '_id': 'IT1001',
                'name': 'Iphone',
                'color': 'Red',
                'quantity': '2',
                'price': '299.00',
            },
        ],
        'shippingSubtotal': '$29.00',
    },
];

const TableDemo = ({ items, shippingSubtotal }) => {
    const subtotal = items.reduce(
        (sum, item) => sum + parseFloat(item.price),
        0
    );
    const total = subtotal + parseFloat(shippingSubtotal.replace('$', ''));

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
                            ${parseFloat(item.price).toFixed(2)}
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
                        ${subtotal.toFixed(2)}
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
                        ${total.toFixed(2)}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between">
        <span className="font-medium text-gray-700">{label}:</span>
        <span className="text-right">{value}</span>
    </div>
);

const InfoSection = ({ title, children }) => (
    <div className="border border-gray-200 rounded-lg p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-800 text-center">
            {title}
        </h3>
        {children}
    </div>
);

export const ViewDetailsSheet = ({
    orderId,
    dateOrder,
    stageOrder,
    paymentMethod,
    paymentStatus,
}) => {
    // Find the order details based on the orderId
    const orderDetails =
        ORDER_DETAILS.find((order) => order._id === orderId) ||
        ORDER_DETAILS[0];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="px-0 text-sm">
                    <span className="flex items-center gap-1">
                        View <ArrowUpRight className="h-4 w-4" />
                    </span>
                </Button>
            </SheetTrigger>

            <SheetContent className="sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-center">
                        Order {orderId} Details
                    </SheetTitle>
                    <SheetDescription>
                        <div className="flex flex-col gap-6 mt-6">
                            <InfoSection title="Receiver Information">
                                <InfoRow
                                    label="Full Name"
                                    value={orderDetails.receiverName}
                                />
                                <InfoRow
                                    label="Phone"
                                    value={orderDetails.receiverPhone}
                                />
                                <InfoRow
                                    label="Address"
                                    value={orderDetails.address}
                                />
                            </InfoSection>

                            <InfoSection title="Order Summary">
                                <InfoRow label="Order ID" value={orderId} />
                                <InfoRow label="Date" value={dateOrder} />
                                <InfoRow
                                    label="Stage"
                                    value={<StageBadge status={stageOrder} />}
                                />
                                <InfoRow
                                    label="Payment Method"
                                    value={paymentMethod}
                                />
                                <InfoRow
                                    label="Payment Status"
                                    value={
                                        <PaidStatusBadge
                                            status={paymentStatus}
                                        />
                                    }
                                />
                            </InfoSection>

                            <InfoSection title="Items Ordered">
                                <TableDemo
                                    items={orderDetails.items}
                                    shippingSubtotal={
                                        orderDetails.shippingSubtotal
                                    }
                                />
                            </InfoSection>

                            <div className="flex gap-3">
                                <Button className="flex-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                                    Prepare
                                </Button>
                                <Button className="flex-1 bg-red-100 text-red-700 hover:bg-red-200">
                                    Reject
                                </Button>
                            </div>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};
