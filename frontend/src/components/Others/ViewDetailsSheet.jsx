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

const ORDER_ITEMS = [
    {
        id: 'IT1001',
        name: 'iPhone 15',
        color: 'Black',
        quantity: 1,
        amount: 999,
    },
    {
        id: 'IT1002',
        name: 'MacBook Pro',
        color: 'Silver',
        quantity: 1,
        amount: 1999,
    },
    {
        id: 'IT1003',
        name: 'AirPods Pro',
        color: 'White',
        quantity: 2,
        amount: 499,
    },
    {
        id: 'IT1004',
        name: 'iPad Mini',
        color: 'Space Gray',
        quantity: 1,
        amount: 599,
    },
];

const TOTAL_AMOUNT = ORDER_ITEMS.reduce((sum, item) => sum + item.amount, 0);

const TableDemo = () => (
    <Table>
        <TableCaption>List of items in the order</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="text-center w-[100px]">Item</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Color</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-center">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {ORDER_ITEMS.map((item, index) => (
                <TableRow key={index}>
                    <TableCell className="text-center font-medium">
                        {item.id}
                    </TableCell>
                    <TableCell className="text-center">{item.name}</TableCell>
                    <TableCell className="text-center">{item.color}</TableCell>
                    <TableCell className="text-center">
                        {item.quantity}
                    </TableCell>
                    <TableCell className="text-center text-green-600">
                        ${item.amount.toFixed(2)}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
        <TableFooter>
            <TableRow>
                <TableCell colSpan={4} className="text-center font-medium">
                    Total
                </TableCell>
                <TableCell className="text-center font-bold text-green-700">
                    ${TOTAL_AMOUNT.toFixed(2)}
                </TableCell>
            </TableRow>
        </TableFooter>
    </Table>
);

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

export const ViewDetailsSheet = ({ orderId }) => {
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
                                <InfoRow label="Full Name" value="John Doe" />
                                <InfoRow label="Phone" value="0327-589-6382" />
                                <InfoRow
                                    label="Address"
                                    value="123 Main St, Metropolis"
                                />
                            </InfoSection>

                            <InfoSection title="Order Summary">
                                <InfoRow label="Order ID" value={orderId} />
                                <InfoRow label="Date" value="2023-10-01" />
                                <InfoRow
                                    label="Stage"
                                    value={<StageBadge status="New" />}
                                />
                                <InfoRow
                                    label="Payment Method"
                                    value="Credit Card"
                                />
                                <InfoRow
                                    label="Payment Status"
                                    value={<PaidStatusBadge status="Paid" />}
                                />
                            </InfoSection>

                            <InfoSection title="Items Ordered">
                                <TableDemo />
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
