import { useEffect, useState } from 'react';
import { api } from '/utils/api';
export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await api('/products');

                const formattedData = data.map((product) => ({
                    ...product,
                    img: product.image.replace(/^"+|"+$/g, ''),
                    colors: product.colors,
                }));

                setProducts(formattedData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};
