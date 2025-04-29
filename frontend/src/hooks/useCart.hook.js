import { useState, useMemo, useEffect } from 'react';
import { api } from '/utils/api';

const initializeCheckedProducts = (products) =>
    products.reduce((acc, { _id }) => {
        acc[_id] = false;
        return acc;
    }, {});

const useCart = () => {
    const [products, setProducts] = useState([]);
    const [checkedProducts, setCheckedProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await api('/cart');

            const cartProducts = Array.isArray(data.items) ? data.items : [];

            setProducts(cartProducts);
            setCheckedProducts(initializeCheckedProducts(cartProducts));
        } catch (err) {
            setError(err.message);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const updateCartItemQuantity = async (id, newQuantity) => {
        try {
            // Ensure newQuantity is a valid number between 1 and stock
            const parsedQuantity = Math.max(1, Number(newQuantity));

            const response = await api(`/cart/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ quantity: parsedQuantity }), // Remove .toString()
                headers: { 'Content-Type': 'application/json' },
            });

            setProducts((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? { ...item, quantity: parsedQuantity }
                        : item
                )
            );
            return response;
        } catch (error) {
            console.error('Failed to update quantity:', error);
            throw error;
        }
    };

    const deleteCartItem = async (id) => {
        try {
            await api(`/cart/${id}`, {
                method: 'DELETE',
            });
            setProducts((prev) => prev.filter((item) => item._id !== id));
            setCheckedProducts((prev) => {
                const newChecked = { ...prev };
                delete newChecked[id];
                return newChecked;
            });
        } catch (error) {
            console.error('Failed to delete item:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleProductCheck = (id, checked) => {
        setCheckedProducts((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    const handleCheckAll = (checked) => {
        const updatedChecked = products.reduce((acc, { _id, stock }) => {
            if (stock > 0) acc[_id] = checked;
            return acc;
        }, {});
        setCheckedProducts(updatedChecked);
    };

    const allChecked = useMemo(() => {
        return (
            products.length > 0 &&
            products.every(
                ({ _id, stock }) => stock > 0 && checkedProducts[_id]
            )
        );
    }, [products, checkedProducts]);

    return {
        products,
        checkedProducts,
        handleProductCheck,
        handleCheckAll,
        allChecked,
        loading,
        error,
        refetchCart: fetchCart,
        deleteCartItem,
        updateCartItemQuantity,
    };
};

export default useCart;
