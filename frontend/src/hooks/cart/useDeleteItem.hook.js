import { useState, useCallback } from 'react';
import { cartApi } from '/utils/api/cart.api';

export const useDeleteItem = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteItem = useCallback(async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await cartApi.removeFromCart(id);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to delete cart item');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        deleteItem,
        isLoading,
        error,
    };
};
