import React, { useState } from 'react';
import { InboxArrowDownIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import StatusSelector from '@/components/Selectors/StatusSelector';
import OrderItemAccordion from '@/components/Accordion/OrderItemAccordion/OrderItemAccordion';
import { useFetchOrders } from '@/hooks/order/useFetchOrders.hook';

const Order = () => {
    const { orders, loading, error, refetch } = useFetchOrders();
    const [activeTab, setActiveTab] = useState('All Orders');

    const filteredOrders =
        activeTab === 'All Orders'
            ? orders
            : orders.filter((order) => order.currentStage === activeTab);

    if (loading) {
        return (
            <Body>
                <HeaderWithIcon icon={InboxArrowDownIcon} title="My Orders" />
                <div className="px-4">
                    <LoadingState />
                </div>
            </Body>
        );
    }

    if (error) {
        return (
            <Body>
                <HeaderWithIcon icon={InboxArrowDownIcon} title="My Orders" />
                <div className="px-4">
                    <ErrorState error={error} onRetry={refetch} />
                </div>
            </Body>
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

const LoadingState = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
);

const ErrorState = ({ error, onRetry }) => (
    <div className="border border-red-200 rounded-lg bg-red-50 p-4">
        <p className="text-sm text-red-600 mb-2">
            {error?.message || 'An error occurred while fetching orders.'}
        </p>
        <button
            onClick={onRetry}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
            Try again
        </button>
    </div>
);

const EmptyState = () => (
    <div className="border border-gray-200 rounded-lg bg-white p-4">
        <p className="text-sm text-gray-500">
            No orders found for this status.
        </p>
    </div>
);

export default Order;
