import { useEffect, useState } from 'react';
import { fetchProducts } from '/utils/api/products.api';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //* MOCK API for development
    // useEffect(() => {
    //     fetch('mock/product.json')
    //         .then((response) => response.json())
    //         .then((data) => setProducts(data))
    //         .catch((error) => console.error('Error loading mock data:', error));
    // }, []);

    // *REAL API for production
    useEffect(() => {
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { products, loading, error };
};
