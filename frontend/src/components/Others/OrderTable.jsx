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
import { Checkbox } from '@/components/ui/checkbox';
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

export const OrderTable = ({ orders }) => {
    return (
        <Table>
            <TableHeader className={'bg-gray-100'}>
                <TableRow>
                    <TableHead className="w-[40px]  ">
                        <div className="flex items-center gap-2">
                            <Checkbox className={'size-4 bg-white'} />
                        </div>
                    </TableHead>
                    <TableHead className="w-[180px] text-center">
                        Stage
                    </TableHead>
                    <TableHead className="w-[120px] text-center">
                        Order
                    </TableHead>
                    <TableHead className="w-[180px] text-center">
                        Customer
                    </TableHead>
                    <TableHead className="w-[120px] text-center">
                        Phone
                    </TableHead>

                    <TableHead className="w-[250px] text-center">
                        Bill
                    </TableHead>
                    <TableHead className="w-[120px] text-center ">
                        Items
                    </TableHead>

                    <TableHead className="w-[120px]">Pay Method</TableHead>

                    <TableHead className="w-[120px]  text-center ">
                        Paid Status
                    </TableHead>
                    <TableHead className="text-right pr-4 w-[120px]">
                        View Details
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.order}>
                        <TableCell className="font-medium ">
                            <Checkbox className={'size-4 bg-white'} />
                        </TableCell>
                        <TableCell className="">
                            {' '}
                            <div className="flex items-center justify-center">
                                <div className="bg-yellow-100 text-yellow-800 rounded-lg px-4 py-1 text-sm font-medium w-fit ">
                                    Accepting
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="font-medium text-center">
                            {order.order}
                        </TableCell>
                        <TableCell className="text-center">Vicky Noa</TableCell>
                        <TableCell className="text-center">
                            0327 - 589 - 638
                        </TableCell>

                        <TableCell className="text-center">
                            {order.totalAmount}
                        </TableCell>
                        <TableCell className="text-center">1</TableCell>

                        <TableCell>{order.paymentMethod}</TableCell>

                        <TableCell>
                            <div className="flex items-center justify-center">
                                <div className="bg-green-100 text-green-800 rounded-lg px-4 py-1 text-sm font-medium w-fit ">
                                    {order.paymentStatus}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            <Sheet>
                                <SheetTrigger>
                                    <Button
                                        variant="link"
                                        className={'cursor-pointer'}
                                    >
                                        <div className="flex items-center gap-2">
                                            View
                                            <ArrowUpRight className="h-4 w-4" />
                                        </div>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>
                                            Are you absolutely sure?
                                        </SheetTitle>
                                        <SheetDescription>
                                            This action cannot be undone. This
                                            will permanently delete your account
                                            and remove your data from our
                                            servers.
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell className={'text-center'}>Total</TableCell>
                    <TableCell colSpan={3}></TableCell>
                    <TableCell className="text-center">$2,500.00</TableCell>
                    <TableCell colSpan={4}></TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};
