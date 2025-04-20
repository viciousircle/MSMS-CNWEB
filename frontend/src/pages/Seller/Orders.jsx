import React, { useMemo, useState } from 'react';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DatePicker from '@/components/Others/DatePicker';
import { OrderTable } from '@/components/Others/OrderTable';
import { OrderTabsMenu } from '@/components/Others/OrderTabsMenu';
import { PaginationControls } from '@/components/Others/PaginationControls';
import PrintButton from '@/components/Buttons/PrintButton';
import ChangeStageMenu from '@/components/Others/ChangeStageMenu';
import StageFlow from '@/components/Others/StageFlow';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const ORDERS_PER_PAGE = 10;

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
        };
    });
};

const ActionButtons = React.memo(() => (
    <div className="flex items-center w-full gap-2 justify-start">
        <PrintButton />
        <ChangeStageMenu />

        <StageFlow />
    </div>
));

const FilterControls = React.memo(({ ordersPerPage, onItemsPerPageChange }) => (
    <div className="flex items-center w-full gap-2 justify-end">
        <div className="flex items-center gap-2 w-full">
            <span className="text-sm text-gray-600">Showing</span>
            <Select
                value={ordersPerPage.toString()}
                onValueChange={(value) => onItemsPerPageChange(value)}
                className=""
            >
                <SelectTrigger className="w-[50px] h-8 border border-gray-300 rounded-md shadow-sm text-gray-500 text-sm">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <DatePicker />
        <OrderTabsMenu />
    </div>
));

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(10);
    const [orders, setOrders] = useState(() => generateOrders(205));

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

    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * ordersPerPage;
        return orders.slice(start, start + ordersPerPage);
    }, [orders, currentPage, ordersPerPage]);

    const handleItemsPerPageChange = (value) => {
        setOrdersPerPage(Number(value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const renderTabsContent = (value) => (
        <TabsContent value={value} className="w-full">
            <OrderTable orders={paginatedOrders} onUpdate={updateOrder} />
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
                        <FilterControls
                            ordersPerPage={ordersPerPage}
                            onItemsPerPageChange={handleItemsPerPageChange}
                        />
                    </div>

                    {renderTabsContent('all')}
                    {renderTabsContent('new')}
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
