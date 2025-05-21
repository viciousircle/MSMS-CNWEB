import { useState, useCallback } from 'react';
import { cartApi } from '/utils/api/cart.api';

export const useDeleteItem = () => {
    const [error, setError] = useState(null);

    const deleteItem = useCallback(async (id) => {
        setError(null);
        try {
            const response = await cartApi.removeFromCart(id);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to delete cart item');
            throw err;
        }
    }, []);

    return {
        deleteItem,
        error,
    };
};
