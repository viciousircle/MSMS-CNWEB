import { useState, useCallback } from 'react';
import { cartApi } from '/utils/api/cart.api';

export const useUpdateQuantity = (updateProductQuantity) => {
    const [error, setError] = useState(null);

    const updateQuantity = useCallback(
        async (id, newQuantity) => {
            setError(null);
            try {
                const parsedQuantity = Math.max(1, Number(newQuantity));
                // Optimistic update
                updateProductQuantity(id, parsedQuantity);

                const response = await cartApi.updateCartItem(
                    id,
                    parsedQuantity
                );
                return response;
            } catch (err) {
                setError(err.message || 'Failed to update cart item quantity');
                throw err;
            }
        },
        [updateProductQuantity]
    );

    return {
        updateQuantity,
        error,
    };
};
