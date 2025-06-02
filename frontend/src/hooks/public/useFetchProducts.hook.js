import { useEffect, useState } from 'react';
import { productApi } from '/utils/api/product.api';
// XXX
export const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAllProducts();
                const formattedData = response.map((product) => ({
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
