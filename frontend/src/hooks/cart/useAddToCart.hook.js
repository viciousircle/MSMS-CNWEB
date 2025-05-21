import { useState } from 'react';
import { cartApi } from '/utils/api/cart.api';

export const useAddToCart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addToCart = async (productId, selectedColor, quantity) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await cartApi.addToCart(
                productId,
                selectedColor,
                quantity
            );
            return response;
        } catch (err) {
            setError(err.message || 'Failed to add item to cart');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        addToCart,
        isLoading,
        error,
    };
};
