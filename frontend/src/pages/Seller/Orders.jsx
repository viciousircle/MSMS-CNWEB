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
import Footer from '@/components/Structure/Footer';
import { toast } from 'sonner';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

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
        fetchOrders,
        setPaginatedOrders,
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

    const handleStageUpdate = async (orderId, newStage) => {
        console.log('handleStageUpdate called with:', { orderId, newStage });
        console.log('Current selected orders:', Array.from(selectedRows));
        console.log('Current paginated orders:', paginatedOrders);

        try {
            // Update the order in the backend
            console.log('Sending update to backend:', {
                orderId,
                stage: newStage,
            });
            const updatedOrder = await updateOrder(orderId, {
                stage: newStage,
            });
            console.log('Backend update response:', updatedOrder);

            // Immediately update the local state
            const updatedOrders = paginatedOrders.map((order) => {
                if (order._id === orderId) {
                    const updatedOrder = {
                        ...order,
                        orderStage: newStage,
                    };
                    console.log('Updated order in local state:', updatedOrder);
                    return updatedOrder;
                }
                return order;
            });
            console.log('Setting updated orders:', updatedOrders);
            setPaginatedOrders(updatedOrders);

            // Update the orders in the parent component
            console.log('Fetching fresh orders from backend');
            await fetchOrders();
            console.log('Orders refreshed successfully');
        } catch (error) {
            console.error('Error in handleStageUpdate:', error);
            toast.error('Failed to update order stage');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Body>
                    <HeaderWithIcon icon={ArchiveBoxIcon} title="Orders" />
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                </Body>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen">
                <Body>
                    <HeaderWithIcon icon={ArchiveBoxIcon} title="Orders" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="p-4 text-center"
                    >
                        <p className="text-red-500 mb-2 bg-red-100 flex items-center justify-center px-4 py-2 rounded-lg w-fit text-center">
                            Error: {error}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-500 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </motion.button>
                    </motion.div>
                </Body>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <HeaderWithIcon icon={ArchiveBoxIcon} title="Orders" />
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-4 px-4 w-full"
                >
                    <Tabs
                        defaultValue="all"
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full flex flex-col gap-4"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="flex justify-between items-center"
                        >
                            <div className="flex items-center gap-2">
                                <PrintButton />
                                <ChangeStageMenu
                                    selectedOrders={selectedRows}
                                    orders={paginatedOrders}
                                    onStageUpdated={handleStageUpdate}
                                />
                                <StageFlow />
                            </div>
                            <FilterControls
                                ordersPerPage={ordersPerPage}
                                onItemsPerPageChange={handleItemsPerPageChange}
                                selectedDate={selectedDate}
                                onDateChange={setSelectedDate}
                            />
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {tabValues.map((tabValue) => (
                                <TabsContent
                                    key={tabValue}
                                    value={tabValue}
                                    className="w-full"
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <OrderTable
                                            orders={paginatedOrders}
                                            onUpdate={handleStageUpdate}
                                            selectedRows={selectedRows}
                                            onToggleSelection={
                                                toggleRowSelection
                                            }
                                            onToggleAll={toggleAllRows}
                                            allSelected={allSelected}
                                        />
                                    </motion.div>
                                </TabsContent>
                            ))}
                        </AnimatePresence>
                    </Tabs>

                    <motion.div variants={itemVariants}>
                        <PaginationControls
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </motion.div>
                </motion.div>
            </Body>
            <Footer />
        </div>
    );
};

export default Orders;
