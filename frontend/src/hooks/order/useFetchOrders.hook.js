import { useEffect, useState } from 'react';
import { orderApi } from '/utils/api/order.api';

export const useFetchOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await orderApi.getOrders();
            const ordersData = Array.isArray(response.orders)
                ? response.orders.map((order) => ({
                      ...order,
                      createdAtRaw: order.createdAt,
                      createdAt: new Date(order.createdAt).toLocaleString(
                          'en-US',
                          {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                          }
                      ),
                  }))
                : [];
            setOrders(ordersData);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError(err.message || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { orders, loading, error, refetch: fetchOrders };
};
