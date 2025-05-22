import { useState } from 'react';
import { api } from '/utils/api';
import { validateOrder, buildOrderData } from '@/utils/order.utils';

export const useOrderSubmission = ({ onOrderSuccess }) => {
    const [orderData, setOrderData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitOrder = async (products, receiverInfo) => {
        const validation = validateOrder(products, receiverInfo);
        if (!validation.isValid) {
            setError(validation.error);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = buildOrderData(products, receiverInfo);
            console.log('Sending order data:', data);

            const result = await api('/orders/', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            console.log('Order response:', result);
            setOrderData(data);
            onOrderSuccess?.(result);
        } catch (err) {
            console.error('Order failed:', err);
            setError('Failed to place order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        orderData,
        isLoading,
        error,
        submitOrder,
    };
};
