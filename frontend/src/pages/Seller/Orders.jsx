import React, { useMemo, useState } from 'react';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { format } from 'date-fns';

import { HeaderWithIcon } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import { OrderTable } from '@/components/Others/OrderTable';
import { PaginationControls } from '@/components/Others/PaginationControls';
import PrintButton from '@/components/Buttons/PrintButton';
import ChangeStageMenu from '@/components/Others/ChangeStageMenu';
import StageFlow from '@/components/Others/StageFlow';
import { FilterControls } from '@/components/Others/FilterControls';
import mockOrders from '/public/mock/order.json';

const DEFAULT_ORDERS_PER_PAGE = 10;

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(DEFAULT_ORDERS_PER_PAGE);

    const [orders, setOrders] = useState(mockOrders);

    const [activeTab, setActiveTab] = useState('all');
    const [selectedDate, setSelectedDate] = useState(null);

    const updateOrder = (indexOnPage, updatedFields) => {
        const globalIndex = (currentPage - 1) * ordersPerPage + indexOnPage;
        setOrders((prev) => {
            const newOrders = [...prev];
            newOrders[globalIndex] = {
                ...newOrders[globalIndex],
                ...updatedFields,
            };
            return newOrders;
        });
    };

    const filteredOrders = useMemo(() => {
        let result = [...orders];

        if (activeTab !== 'all') {
            result = result.filter(
                (order) =>
                    order.stageOrder.toLowerCase() === activeTab.toLowerCase()
            );
        }
        if (selectedDate) {
            const selectedDateString = format(selectedDate, 'MM/dd/yyyy');
            result = result.filter((order) => {
                const orderDate = new Date(order.dateOrder);

                const orderDateString = format(orderDate, 'MM/dd/yyyy');
                return orderDateString === selectedDateString;
            });
        }

        return result;
    }, [orders, activeTab, selectedDate]);

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * ordersPerPage;
        return filteredOrders.slice(start, start + ordersPerPage);
    }, [filteredOrders, currentPage, ordersPerPage]);

    const handleItemsPerPageChange = (value) => {
        setOrdersPerPage(Number(value));
        setCurrentPage(1);
    };

    const renderTabsContent = (value) => (
        <TabsContent value={value} className="w-full">
            <OrderTable orders={paginatedOrders} onUpdate={updateOrder} />
        </TabsContent>
    );

    return (
        <Body>
            <HeaderWithIcon icon={ArchiveBoxIcon} title="Orders" />

            <div className="flex flex-col gap-4 px-4 w-full">
                <Tabs
                    defaultValue="all"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full flex flex-col gap-4"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <PrintButton />
                            <ChangeStageMenu />
                            <StageFlow />
                        </div>
                        <FilterControls
                            ordersPerPage={ordersPerPage}
                            onItemsPerPageChange={handleItemsPerPageChange}
                            selectedDate={selectedDate}
                            onDateChange={setSelectedDate}
                        />
                    </div>

                    {renderTabsContent('all')}
                    {renderTabsContent('new')}
                    {renderTabsContent('prepare')}
                    {renderTabsContent('shipping')}
                    {renderTabsContent('shipped')}
                    {renderTabsContent('canceled')}
                    {renderTabsContent('reject')}
                </Tabs>

                <PaginationControls
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </Body>
    );
};

export default Orders;
