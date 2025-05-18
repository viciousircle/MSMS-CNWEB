import { useEffect, useState } from 'react';
import { orderApi } from '/utils/api/order.api';

export const useCancelOrder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [cancelledOrder, setCancelledOrder] = useState(null);

    const cancelOrder = async (orderId) => {
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);
        setCancelledOrder(null);

        try {
            const response = await orderApi.cancelOrder(orderId);
            setIsSuccess(true);
            setCancelledOrder(response.order);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to cancel order');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    return {
        cancelOrder,
        isLoading,
        error,
        isSuccess,
        cancelledOrder,
    };
};
