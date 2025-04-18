import React from 'react';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DatePicker from '@/components/Others/DatePicker';
import { OrderTable } from '@/components/Others/OrderTable';
import { OrderTabsMenu } from '@/components/Others/OrderTabsMenu';
import { PaginationControls } from '@/components/Others/PaginationControls';

const Orders = () => {
    const orders = [
        {
            order: 'INV001',
            paymentStatus: 'Paid',
            totalAmount: '$250.00',
            paymentMethod: 'Credit Card',
        },
    ];

    return (
        <Body>
            <HeaderWithIcon icon={ArchiveBoxIcon} title="Orders" />
            <div className="flex flex-col gap-4 justify-center items-center px-4">
                <Tabs
                    defaultValue="new"
                    className="w-full flex flex-col gap-4 justify-center items-center"
                >
                    <div className="flex items-center w-full gap-2 justify-end">
                        <DatePicker />
                        <OrderTabsMenu />
                    </div>

                    <TabsContent value="all" className={'w-full'}>
                        <OrderTable orders={orders} />
                    </TabsContent>
                    <TabsContent value="new" className={'w-full'}>
                        <OrderTable orders={orders} />
                    </TabsContent>
                </Tabs>
                <PaginationControls />
            </div>
        </Body>
    );
};

export default Orders;
