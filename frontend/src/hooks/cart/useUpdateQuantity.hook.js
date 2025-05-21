import { useState, useCallback } from 'react';
import { cartApi } from '/utils/api/cart.api';

export const useUpdateQuantity = () => {
    const [error, setError] = useState(null);

    const updateQuantity = useCallback(async (id, newQuantity) => {
        setError(null);
        try {
            const parsedQuantity = Math.max(1, Number(newQuantity));
            // Return the parsed quantity immediately for optimistic update
            const response = await cartApi.updateCartItem(id, parsedQuantity);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to update cart item quantity');
            throw err;
        }
    }, []);

    return {
        updateQuantity,
        error,
    };
};
