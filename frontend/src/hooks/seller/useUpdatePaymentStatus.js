import { useState } from 'react';
import { api } from '/utils/api';

export const useUpdatePaymentStatus = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updatePaymentStatus = async (orderId, isPaid) => {
        try {
            setIsUpdating(true);
            setError(null);

            const response = await api(`/seller/orders/${orderId}/payment`, {
                method: 'PUT',
                body: JSON.stringify({ isPaid }),
            });

            return response;
        } catch (err) {
            setError(err.message || 'Failed to update payment status');
            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    return { updatePaymentStatus, isUpdating, error };
};
