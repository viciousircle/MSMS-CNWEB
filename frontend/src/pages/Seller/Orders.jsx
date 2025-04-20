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

const DEFAULT_ORDERS_PER_PAGE = 10;

const generateOrders = (count) => {
    const names = [
        'Vicky Noa',
        'James Reed',
        'Ava Clarkson',
        'Leo Tanaka',
        'Sofia Mendes',
    ];
    const phones = [
        '0327 - 589 - 638',
        '0412 - 987 - 223',
        '0301 - 456 - 789',
        '0219 - 112 - 334',
        '0456 - 789 - 123',
    ];
    const stages = ['New', 'Prepare', 'Shipping', 'Shipped', 'Reject'];
    const paymentStatuses = ['Paid', 'Unpaid'];
    const paymentMethods = ['Credit Card', 'Cash', 'Momo'];

    return Array.from({ length: count }, (_, index) => {
        const randomIndex = (arr) =>
            arr[Math.floor(Math.random() * arr.length)];
        return {
            order: `INV00${index + 1}`,
            paymentStatus: randomIndex(paymentStatuses),
            totalAmount: (Math.random() * 200 + 50).toFixed(2),
            paymentMethod: randomIndex(paymentMethods),
            customerName: randomIndex(names),
            customerPhone: randomIndex(phones),
            stage: randomIndex(stages),
            dateOrdered: new Date(
                Date.now() - Math.floor(Math.random() * 10000000000)
            ).toLocaleDateString(),
        };
    });
};

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(DEFAULT_ORDERS_PER_PAGE);
    const [orders, setOrders] = useState(() => generateOrders(205));
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
                (order) => order.stage.toLowerCase() === activeTab.toLowerCase()
            );
        }
        if (selectedDate) {
            const selectedDateString = format(selectedDate, 'MM/dd/yyyy');
            result = result.filter((order) => {
                const orderDate = new Date(order.dateOrdered);
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
                    {renderTabsContent('rated')}
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
