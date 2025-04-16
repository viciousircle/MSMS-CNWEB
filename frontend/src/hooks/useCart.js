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
                    quantity: item.quantity,
                    color: item.color,
                }));
                setProducts(items);

                const initialChecked = items.reduce((acc, product) => {
                    acc[product._id] = false;
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

    const handleProductCheck = (productId, isChecked) => {
        setCheckedProducts((prev) => ({
            ...prev,
            [productId]: isChecked,
        }));
    };

    const handleAllProductsCheck = (isChecked) => {
        const newChecked = { ...checkedProducts };
        products.forEach((product) => {
            if (product.inStock > 0) {
                newChecked[product._id] = isChecked;
            }
        });
        setCheckedProducts(newChecked);
    };

    return {
        products,
        checkedProducts,
        handleProductCheck,
        handleAllProductsCheck,
        allChecked: Object.values(checkedProducts).every((v) => v),
        loading,
        error,
    };
};

export default useCart;
