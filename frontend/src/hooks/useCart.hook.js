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

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                const data = await api('/cart');

                const cartProducts = Array.isArray(data.items)
                    ? data.items
                    : [];

                setProducts(cartProducts);
                setCheckedProducts(initializeCheckedProducts(cartProducts));
            } catch (err) {
                setError(err.message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

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
        setProducts,
    };
};

export default useCart;
