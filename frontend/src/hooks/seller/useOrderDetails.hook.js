import { useEffect, useState } from 'react';

export const useOrderDetails = (orderId) => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch('/mock/orderdetails.json');
                if (!response.ok)
                    throw new Error('Failed to fetch order details');
                const data = await response.json();
                const order = data.find((order) => order._id === orderId);
                if (!order) throw new Error('Order not found');
                setOrderDetails(order);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    return { orderDetails, loading, error };
};
