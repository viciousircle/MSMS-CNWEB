import { useState } from 'react';
import { useFetchOrders } from '@/hooks/order/useFetchOrders.hook';

export const useOrderLogic = () => {
    const { orders, loading, error, refetch } = useFetchOrders();
    const [activeTab, setActiveTab] = useState('All Orders');

    const filteredOrders =
        activeTab === 'All Orders'
            ? orders
            : orders.filter((order) => order.currentStage === activeTab);

    return {
        orders,
        filteredOrders,
        loading,
        error,
        refetch,
        activeTab,
        setActiveTab,
    };
};
