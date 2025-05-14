import { useEffect, useState } from 'react';
import { cartApi } from 'utils/api/cart.api';

export const useUpdateQuantity = (itemId, quantity) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const updateQuantity = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await cartApi.updateCartItem(itemId, quantity);
                if (response) {
                    setSuccess(true);
                }
            } catch (err) {
                console.error('Error updating cart item:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (itemId && quantity) {
            updateQuantity();
        }
    }, [itemId, quantity]);

    return { loading, error, success };
};
