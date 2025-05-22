import { useState, useCallback } from 'react';
import { orderApi } from '/utils/api/order.api';

export const useCreateOrder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createOrder = useCallback(async (orderData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await orderApi.createOrder(orderData);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to create order');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        createOrder,
        isLoading,
        error,
    };
};
