import React, { useState } from 'react';
import { InboxArrowDownIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import StatusSelector from '@/components/Selectors/StatusSelector';
import OrderItemAccordion from '@/components/Accordion/OrderItemAccordion/OrderItemAccordion';

const CUSTOMER_ORDERS = [
    {
        id: 'ORD001',
        date: '2025-05-15',
        total: 129.99,
        status: 'Completed',
        paidStatus: 'Paid',
        stage: 'Shipped',
        items: [
            { name: 'T-Shirt', quantity: 2, price: 29.99 },
            { name: 'Jeans', quantity: 1, price: 70.01 },
        ],
        shippingAddress: '123 Main St, Springfield, IL 62701',
    },
    {
        id: 'ORD002',
        date: '2025-05-10',
        total: 89.5,
        status: 'Shipping',
        paidStatus: 'Unpaid',
        stage: 'Prepare',
        items: [{ name: 'Sneakers', quantity: 1, price: 89.5 }],
        shippingAddress: '456 Oak Ave, Springfield, IL 62702',
    },
    {
        id: 'ORD003',
        date: '2025-04-28',
        total: 249.0,
        status: 'New',
        paidStatus: 'Unpaid',
        stage: 'New',
        items: [
            { name: 'Jacket', quantity: 1, price: 199.0 },
            { name: 'Hat', quantity: 1, price: 50.0 },
        ],
        shippingAddress: '789 Pine Rd, Springfield, IL 62703',
    },
    {
        id: 'ORD004',
        date: '2025-05-05',
        total: 50.0,
        status: 'Canceled',
        paidStatus: 'Paid',
        stage: 'Reject',
        items: [{ name: 'Shirt', quantity: 1, price: 50.0 }],
        shippingAddress: '101 Elm St, Springfield, IL 62704',
    },
];

const Order = () => {
    const [activeTab, setActiveTab] = useState('All Orders');

    const filteredOrders =
        activeTab === 'All Orders'
            ? CUSTOMER_ORDERS
            : CUSTOMER_ORDERS.filter((order) => order.status === activeTab);

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
                            <OrderItemAccordion key={order.id} order={order} />
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
