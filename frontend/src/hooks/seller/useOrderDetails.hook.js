import { useEffect, useState } from 'react';
import { api } from '/utils/api';

export const useOrderDetails = (orderId) => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await api(`/seller/orders/${orderId}`);

            const transformedData = {
                ...data,
                items: data.orderItems,
                address: data.receiverAddress,
            };

            setOrderDetails(transformedData);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            fetchData();
        }
    }, [orderId]);

    return {
        orderDetails,
        loading,
        error,
        refetch: fetchData, // Add refetch capability
    };
};
