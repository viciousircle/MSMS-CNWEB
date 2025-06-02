import { useState, useCallback } from 'react';
import { cartApi } from '/utils/api/cart.api';

export const useDeleteItem = (removeProduct) => {
    const [error, setError] = useState(null);

    const deleteItem = useCallback(
        async (id) => {
            setError(null);
            try {
                removeProduct(id);

                const response = await cartApi.removeFromCart(id);
                return response;
            } catch (err) {
                setError(err.message || 'Failed to delete cart item');
                throw err;
            }
        },
        [removeProduct]
    );

    return {
        deleteItem,
        error,
    };
};
