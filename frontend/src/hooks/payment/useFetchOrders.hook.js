import { useState, useCallback } from 'react';
import { orderApi } from '/utils/api/order.api';

export const useFetchOrders = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);

    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await orderApi.getOrders();
            setOrders(response);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to fetch orders');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchOrder = useCallback(async (orderId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await orderApi.getOrder(orderId);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to fetch order');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        orders,
        fetchOrders,
        fetchOrder,
        isLoading,
        error,
    };
};
