import React from 'react';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import { OrderTable } from '@/components/Tables/OrderTable/OrderTable';
import { PaginationControls } from '@/components/Others/PaginationControls';
import PrintButton from '@/components/Buttons/PrintButton';
import ChangeStageMenu from '@/components/Others/ChangeStageMenu';
import StageFlow from '@/components/Others/StageFlow';
import { FilterControls } from '@/components/Others/FilterControls';
import { useOrdersLogic } from '@/hooks/seller/useOrdersLogic.hook';
import { useOrderTable } from '@/hooks/seller/useOrderTable.hook';

const Orders = () => {
    const {
        currentPage,
        ordersPerPage,
        activeTab,
        selectedDate,
        paginatedOrders,
        totalPages,
        loading,
        error,
        setCurrentPage,
        setActiveTab,
        setSelectedDate,
        updateOrder,
        handleItemsPerPageChange,
    } = useOrdersLogic();

    const { selectedRows, toggleRowSelection, toggleAllRows, allSelected } =
        useOrderTable(paginatedOrders);

    const tabValues = [
        'all',
        'new',
        'prepare',
        'shipping',
        'shipped',
        'cancelled',
        'reject',
    ];

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                            <ChangeStageMenu
                                selectedOrders={selectedRows}
                                orders={paginatedOrders}
                                onStageUpdated={() => {
                                    // Refresh the orders list
                                    window.location.reload();
                                }}
                            />
                            <StageFlow />
                        </div>
                        <FilterControls
                            ordersPerPage={ordersPerPage}
                            onItemsPerPageChange={handleItemsPerPageChange}
                            selectedDate={selectedDate}
                            onDateChange={setSelectedDate}
                        />
                    </div>

                    {tabValues.map((tabValue) => (
                        <TabsContent
                            key={tabValue}
                            value={tabValue}
                            className="w-full"
                        >
                            <OrderTable
                                orders={paginatedOrders}
                                onUpdate={updateOrder}
                                selectedRows={selectedRows}
                                onToggleSelection={toggleRowSelection}
                                onToggleAll={toggleAllRows}
                                allSelected={allSelected}
                            />
                        </TabsContent>
                    ))}
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
