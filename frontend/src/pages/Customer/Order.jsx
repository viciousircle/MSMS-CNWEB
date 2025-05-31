import React from 'react';
import { OrderView } from '@/components/Order/OrderView';
import { useOrderLogic } from '@/hooks/order/useOrderLogic.hook';

//XXX: Order done
const Order = () => {
    const { filteredOrders, loading, error, refetch, activeTab, setActiveTab } =
        useOrderLogic();

    return (
        <OrderView
            filteredOrders={filteredOrders}
            loading={loading}
            error={error}
            refetch={refetch}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
    );
};

export default Order;
