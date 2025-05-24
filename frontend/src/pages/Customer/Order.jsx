import React, { useState } from 'react';
import { InboxArrowDownIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import StatusSelector from '@/components/Selectors/StatusSelector';
import OrderItemAccordion from '@/components/Accordion/OrderItemAccordion/OrderItemAccordion';
import { useFetchOrders } from '@/hooks/order/useFetchOrders.hook';
import LoadingState from '@/components/States/LoadingState';
import ErrorState from '@/components/States/ErrorState';
import Footer from '@/components/Structure/Footer';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 20,
            mass: 1,
        },
    },
    exit: {
        opacity: 0,
        y: -30,
        scale: 0.98,
        transition: {
            duration: 0.25,
            ease: 'easeInOut',
        },
    },
};

const Order = () => {
    const { orders, loading, error, refetch } = useFetchOrders();
    const [activeTab, setActiveTab] = useState('All Orders');

    const filteredOrders =
        activeTab === 'All Orders'
            ? orders
            : orders.filter((order) => order.currentStage === activeTab);

    if (loading) {
        return <LoadingState icon={InboxArrowDownIcon} title="My Orders" />;
    }

    if (error) {
        return (
            <ErrorState
                icon={InboxArrowDownIcon}
                title="My Orders"
                error={error}
                onRetry={refetch}
            />
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <HeaderWithIcon icon={InboxArrowDownIcon} title="My Orders" />

                <div className="px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 25,
                            mass: 1.2,
                            delay: 0.3,
                        }}
                        className="mb-6"
                    >
                        <StatusSelector
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </motion.div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        <AnimatePresence mode="wait">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <motion.div
                                        key={order._id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        layout
                                    >
                                        <OrderItemAccordion
                                            order={order}
                                            refetchOrders={refetch}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <EmptyState />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </Body>
            <Footer />
        </div>
    );
};

const EmptyState = () => (
    <div className="border border-gray-200 rounded-lg bg-white p-4">
        <p className="text-sm text-gray-500">
            No orders found for this status.
        </p>
    </div>
);

export default Order;
