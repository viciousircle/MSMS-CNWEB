import React, { useMemo } from 'react';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import {
    ArchiveBoxIcon,
    ArrowPathRoundedSquareIcon,
    PrinterIcon,
} from '@heroicons/react/24/outline';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DatePicker from '@/components/Others/DatePicker';
import { OrderTable } from '@/components/Others/OrderTable';
import { OrderTabsMenu } from '@/components/Others/OrderTabsMenu';
import { PaginationControls } from '@/components/Others/PaginationControls';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const generateOrders = (count) =>
    Array.from({ length: count }, (_, index) => ({
        order: `INV00${index + 1}`,
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    }));

const ActionButtons = React.memo(() => (
    <div className="flex items-center w-full gap-2 justify-start">
        <Button variant="destructive">
            <PrinterIcon className="w-4 h-4" />
            Print Label
        </Button>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    <ArrowPathRoundedSquareIcon className="w-4 h-4 mr-1" />
                    Change Stage
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Next Stage</DropdownMenuItem>
                <DropdownMenuSeparator />
                {['Preparing', 'Shipping', 'Shipped', 'Rated', 'Reject'].map(
                    (stage) => (
                        <DropdownMenuItem key={stage}>{stage}</DropdownMenuItem>
                    )
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>Previous Stage</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
));

const FilterControls = React.memo(() => (
    <div className="flex items-center w-full gap-2 justify-end">
        <DatePicker />
        <OrderTabsMenu />
    </div>
));

const Orders = () => {
    const orders = useMemo(() => generateOrders(10), []);

    const renderTabsContent = (value) => (
        <TabsContent value={value} className="w-full">
            <OrderTable orders={orders} />
        </TabsContent>
    );

    return (
        <Body>
            <HeaderWithIcon icon={ArchiveBoxIcon} title="Orders" />
            <div className="flex flex-col gap-4 px-4 items-center w-full">
                <Tabs
                    defaultValue="new"
                    className="w-full flex flex-col gap-4 items-center"
                >
                    <div className="flex w-full justify-between items-center">
                        <ActionButtons />
                        <FilterControls />
                    </div>

                    {renderTabsContent('all')}
                    {renderTabsContent('new')}
                </Tabs>
                <PaginationControls />
            </div>
        </Body>
    );
};

export default Orders;
