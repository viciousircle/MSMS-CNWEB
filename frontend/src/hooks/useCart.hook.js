import { useState, useMemo, useEffect, useCallback } from 'react';
import { api } from '/utils/api';

const initializeCheckedProducts = (products) =>
    products.reduce((acc, { _id }) => ({ ...acc, [_id]: false }), {});

const useCart = () => {
    const [state, setState] = useState({
        products: [],
        checkedProducts: {},
        loading: true,
        error: null,
    });

    const fetchCart = useCallback(async () => {
        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            const data = await api('/cart');
            const cartProducts = Array.isArray(data.items) ? data.items : [];

            setState((prev) => ({
                ...prev,
                products: cartProducts,
                checkedProducts: initializeCheckedProducts(cartProducts),
            }));
        } catch (err) {
            setState((prev) => ({
                ...prev,
                error: err.message,
                products: [],
                checkedProducts: {},
            }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    }, []);

    const updateCartItemQuantity = useCallback(async (id, newQuantity) => {
        try {
            const parsedQuantity = Math.max(1, Number(newQuantity));

            await api(`/cart/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ quantity: parsedQuantity }),
                headers: { 'Content-Type': 'application/json' },
            });

            setState((prev) => ({
                ...prev,
                products: prev.products.map((item) =>
                    item._id === id
                        ? { ...item, quantity: parsedQuantity }
                        : item
                ),
            }));
        } catch (error) {
            console.error('Failed to update quantity:', error);
            throw error;
        }
    }, []);

    const deleteCartItem = useCallback(async (id) => {
        try {
            await api(`/cart/${id}`, { method: 'DELETE' });

            setState((prev) => {
                const newChecked = { ...prev.checkedProducts };
                delete newChecked[id];

                return {
                    ...prev,
                    products: prev.products.filter((item) => item._id !== id),
                    checkedProducts: newChecked,
                };
            });
        } catch (error) {
            console.error('Failed to delete item:', error);
            throw error;
        }
    }, []);

    const handleProductCheck = useCallback((id, checked) => {
        setState((prev) => ({
            ...prev,
            checkedProducts: { ...prev.checkedProducts, [id]: checked },
        }));
    }, []);

    const handleCheckAll = useCallback((checked) => {
        setState((prev) => ({
            ...prev,
            checkedProducts: prev.products.reduce(
                (acc, { _id, stock }) => ({
                    ...acc,
                    [_id]: stock > 0 ? checked : acc[_id],
                }),
                prev.checkedProducts
            ),
        }));
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const allChecked = useMemo(
        () =>
            state.products.length > 0 &&
            state.products.every(
                ({ _id, stock }) => stock > 0 && state.checkedProducts[_id]
            ),
        [state.products, state.checkedProducts]
    );

    return {
        products: state.products,
        checkedProducts: state.checkedProducts,
        loading: state.loading,
        error: state.error,
        allChecked,
        handleProductCheck,
        handleCheckAll,
        refetchCart: fetchCart,
        deleteCartItem,
        updateCartItemQuantity,
    };
};

export default useCart;
