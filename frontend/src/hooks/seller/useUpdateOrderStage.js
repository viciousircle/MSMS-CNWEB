import { useState } from 'react';
import { api } from '/utils/api';

export const useUpdateOrderStage = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateOrderStage = async (orderId, stage) => {
        try {
            setIsUpdating(true);
            setError(null);

            const response = await api(`/seller/orders/${orderId}`, {
                method: 'PUT',
                body: JSON.stringify({ stage }),
            });

            return response;
        } catch (err) {
            setError(err.message || 'Failed to update order stage');
            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateOrderStage, isUpdating, error };
};
