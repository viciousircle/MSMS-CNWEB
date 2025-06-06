import { useState, useCallback } from 'react';
import { cartApi } from '/utils/api/cart.api';

export const useFetchCart = (updateProducts) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await cartApi.getCart();
            const cartProducts = Array.isArray(response.items)
                ? response.items
                : [];
            updateProducts(cartProducts);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to fetch cart');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [updateProducts]);

    return {
        fetchCart,
        isLoading,
        error,
    };
};
