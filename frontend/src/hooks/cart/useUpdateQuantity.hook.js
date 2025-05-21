import { useState, useCallback } from 'react';
import { cartApi } from '/utils/api/cart.api';

export const useUpdateQuantity = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateQuantity = useCallback(async (id, newQuantity) => {
        setIsLoading(true);
        setError(null);
        try {
            const parsedQuantity = Math.max(1, Number(newQuantity));
            const response = await cartApi.updateCartItem(id, parsedQuantity);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to update cart item quantity');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        updateQuantity,
        isLoading,
        error,
    };
};
