import React, { useState } from 'react';
import { InboxArrowDownIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import StatusSelector from '@/components/Selectors/StatusSelector';
import OrderItemAccordion from '@/components/Accordion/OrderItemAccordion/OrderItemAccordion';
import { useFetchOrders } from '@/hooks/order/useFetchOrders.hook';
import LoadingState from '@/components/States/LoadingState';
import ErrorState from '@/components/States/ErrorState';

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
        <Body>
            <HeaderWithIcon icon={InboxArrowDownIcon} title="My Orders" />
            <div className="px-4">
                <div className="mb-6">
                    <StatusSelector
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <OrderItemAccordion
                                key={order._id}
                                order={order}
                                refetchOrders={refetch}
                            />
                        ))
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>
        </Body>
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
