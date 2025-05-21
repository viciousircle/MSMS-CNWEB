import { useState, useMemo, useEffect, useCallback } from 'react';
import { useFetchCart } from './cart/useFetchCart.hook';
import { useUpdateQuantity } from './cart/useUpdateQuantity.hook';
import { useDeleteItem } from './cart/useDeleteItem.hook';

const initializeCheckedProducts = (products) =>
    products.reduce((acc, { _id }) => ({ ...acc, [_id]: false }), {});

const useCart = () => {
    const [state, setState] = useState({
        products: [],
        checkedProducts: {},
        loading: true,
        error: null,
    });

    const {
        fetchCart: getCart,
        isLoading: isFetching,
        error: fetchError,
    } = useFetchCart();
    const {
        updateQuantity,
        isLoading: isUpdating,
        error: updateError,
    } = useUpdateQuantity();
    const {
        deleteItem,
        isLoading: isDeleting,
        error: deleteError,
    } = useDeleteItem();

    const fetchCart = useCallback(async () => {
        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            const data = await getCart();
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
    }, [getCart]);

    const updateCartItemQuantity = useCallback(
        async (id, newQuantity) => {
            try {
                await updateQuantity(id, newQuantity);
                setState((prev) => ({
                    ...prev,
                    products: prev.products.map((item) =>
                        item._id === id
                            ? {
                                  ...item,
                                  quantity: Math.max(1, Number(newQuantity)),
                              }
                            : item
                    ),
                }));
            } catch (error) {
                console.error('Failed to update quantity:', error);
                throw error;
            }
        },
        [updateQuantity]
    );

    const deleteCartItem = useCallback(
        async (id) => {
            try {
                await deleteItem(id);
                setState((prev) => {
                    const newChecked = { ...prev.checkedProducts };
                    delete newChecked[id];

                    return {
                        ...prev,
                        products: prev.products.filter(
                            (item) => item._id !== id
                        ),
                        checkedProducts: newChecked,
                    };
                });
            } catch (error) {
                console.error('Failed to delete item:', error);
                throw error;
            }
        },
        [deleteItem]
    );

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
        loading: state.loading || isFetching || isUpdating || isDeleting,
        error: state.error || fetchError || updateError || deleteError,
        allChecked,
        handleProductCheck,
        handleCheckAll,
        refetchCart: fetchCart,
        deleteCartItem,
        updateCartItemQuantity,
    };
};

export default useCart;
