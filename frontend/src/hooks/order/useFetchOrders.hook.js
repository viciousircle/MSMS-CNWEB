import { useEffect, useState } from 'react';
import { orderApi } from '/utils/api/order.api';

export const useFetchOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await orderApi.getOrders();
                const ordersData = Array.isArray(response.orders)
                    ? response.orders.map((order) => ({
                          ...order,
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
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return { orders, loading, error };
};
