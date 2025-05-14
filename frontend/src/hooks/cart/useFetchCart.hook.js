import { useEffect, useState } from 'react';
import { cartApi } from '/utils/api/cart.api';

export const useFetchCart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await cartApi.getCart();
                const cartProducts = Array.isArray(response.items)
                    ? response.items
                    : [];
                setCart(cartProducts);
            } catch (err) {
                console.error('Error fetching cart:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    return { cart, loading, error };
};
