import { useEffect, useState } from 'react';
import { api } from '/utils/api';

const useCart = () => {
    const [products, setProducts] = useState([]);
    const [checkedProducts, setCheckedProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = await api('/cart');
                const items = data.cartItems.map((item) => ({
                    ...item.product,
                    _id: item.product?._id,
                    quantity: item.quantity,
                    color: item.color,
                    colors: Array.isArray(item.product?.colors)
                        ? item.product.colors
                        : [],
                    image: item.product?.image || '',
                    name: item.product?.name || 'Unknown Product',
                    price: item.product?.price || 0,
                }));
                setProducts(items);

                const initialChecked = items.reduce((acc, product) => {
                    if (product._id) {
                        acc[product._id] = false;
                    }
                    return acc;
                }, {});
                setCheckedProducts(initialChecked);
            } catch (err) {
                setError(err.message || 'Failed to fetch cart');
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
        const updated = {};
        products.forEach((p) => {
            const stock = p.colors.find((c) => c.color === p.color)?.stock ?? 0;
            if (stock > 0) {
                updated[p._id] = checked;
            }
        });
        setCheckedProducts(updated);
    };

    const allChecked =
        products.length > 0 &&
        products.every(
            (p) =>
                (checkedProducts[p._id] || false) &&
                (p.colors.find((c) => c.color === p.color)?.stock ?? 0) > 0
        );

    return {
        products,
        checkedProducts,
        handleProductCheck,
        handleCheckAll,
        allChecked,
        loading,
        error,
    };
};

export default useCart;
