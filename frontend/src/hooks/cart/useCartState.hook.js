import { useState, useMemo, useCallback } from 'react';

const initializeCheckedProducts = (products) =>
    products.reduce((acc, { _id }) => ({ ...acc, [_id]: false }), {});

export const useCartState = (initialProducts = []) => {
    const [cartState, setCartState] = useState({
        products: initialProducts,
        checkedProducts: initializeCheckedProducts(initialProducts),
    });

    const allChecked = useMemo(
        () =>
            cartState.products.length > 0 &&
            cartState.products.every(
                ({ _id, stock }) => stock > 0 && cartState.checkedProducts[_id]
            ),
        [cartState.products, cartState.checkedProducts]
    );

    const updateProducts = useCallback((newProducts) => {
        setCartState((prev) => ({
            ...prev,
            products: newProducts,
            checkedProducts: initializeCheckedProducts(newProducts),
        }));
    }, []);

    const updateProductQuantity = useCallback((id, newQuantity) => {
        setCartState((prev) => ({
            ...prev,
            products: prev.products.map((item) =>
                item._id === id ? { ...item, quantity: newQuantity } : item
            ),
        }));
    }, []);

    const removeProduct = useCallback((id) => {
        setCartState((prev) => {
            const newChecked = { ...prev.checkedProducts };
            delete newChecked[id];

            return {
                ...prev,
                products: prev.products.filter((item) => item._id !== id),
                checkedProducts: newChecked,
            };
        });
    }, []);

    const handleProductCheck = useCallback((id, checked) => {
        setCartState((prev) => ({
            ...prev,
            checkedProducts: { ...prev.checkedProducts, [id]: checked },
        }));
    }, []);

    const handleCheckAll = useCallback((checked) => {
        setCartState((prev) => ({
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

    return {
        products: cartState.products,
        checkedProducts: cartState.checkedProducts,
        allChecked,
        updateProducts,
        updateProductQuantity,
        removeProduct,
        handleProductCheck,
        handleCheckAll,
    };
};
