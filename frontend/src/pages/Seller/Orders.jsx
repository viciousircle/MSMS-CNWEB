import React, { useMemo } from 'react';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import {
    ArchiveBoxIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DatePicker from '@/components/Others/DatePicker';
import { OrderTable } from '@/components/Others/OrderTable';
import { OrderTabsMenu } from '@/components/Others/OrderTabsMenu';
import { PaginationControls } from '@/components/Others/PaginationControls';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

import PrintButton from '@/components/Buttons/PrintButton';
import ChangeStageMenu from '@/components/Others/ChangeStageMenu';
import { Button } from '@/components/ui/button';

const generateOrders = (count) =>
    Array.from({ length: count }, (_, index) => ({
        order: `INV00${index + 1}`,
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    }));

const ActionButtons = React.memo(() => (
    <div className="flex items-center w-full gap-2 justify-start">
        <PrintButton />
        <ChangeStageMenu />
    </div>
));

const FilterControls = React.memo(() => (
    <div className="flex items-center w-full gap-2 justify-end">
        <HoverCard>
            <HoverCardTrigger>
                <Button>
                    <InformationCircleIcon className="size-6 text-white" />
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className={'flex w-full'}>
                <StageFlow />
            </HoverCardContent>
        </HoverCard>

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
const StageFlow = () => {
    return (
        <div className="flex items-start p-10 ">
            <div className=" border border-gray-300 px-6 py-1 rounded text-sm h-full flex items-center justify-center ">
                New
            </div>

            <div className="flex flex-col">
                <div className="border-t border-gray-300 px-8 mt-4 rounded-full "></div>
                <div className="border-t border-gray-300 px-8 mt-13  rounded-full"></div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="border border-gray-300 px-6 py-1 rounded text-sm h-full flex items-center justify-center ">
                    Prepare
                </div>
                <div className="border border-gray-300 px-6 py-1 rounded text-sm h-full flex items-center justify-center ">
                    Reject
                </div>
            </div>

            <div className="border-t border-gray-300 px-8 mt-4 rounded-full "></div>

            {/* Shipping */}
            <div className="flex items-center">
                <div className="border border-gray-300 px-6 py-1 rounded text-sm h-full flex items-center justify-center ">
                    Shipping
                </div>
            </div>

            <div className="border-t border-gray-300 px-8 mt-4 rounded-full "></div>
            <div className="flex items-center">
                <div className="border border-gray-300 px-6 py-1 rounded text-sm h-full flex items-center justify-center ">
                    Shipped
                </div>
            </div>
        </div>
    );
};

export default Orders;
