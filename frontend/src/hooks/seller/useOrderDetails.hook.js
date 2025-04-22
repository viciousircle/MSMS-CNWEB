import { useEffect, useState } from 'react';
import { api } from '/utils/api';

export const useOrderDetails = (orderId) => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const data = await api(`/seller/orders/${orderId}`);

                const transformedData = {
                    ...data,
                    items: data.orderItems,
                    address: data.receiverAddress,
                };

                setOrderDetails(transformedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    return { orderDetails, loading, error };
};
