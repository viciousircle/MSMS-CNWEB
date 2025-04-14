import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/Cards/ProductCard';
import { HeaderFullText } from '@/components/Header';
import Body from '@/components/Body';
import { GridCard } from '@/components/Decoration';
import { formatPrice } from '/utils/formatPrice';
import { cleanImageUrl, getSafeImageUrl } from '/utils/formatImage';

const Home = () => {
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     fetch('mock/product.json')
    //         .then((response) => response.json())
    //         .then((data) => setProducts(data))
    //         .catch((error) => console.error('Error loading mock data:', error));
    // }, []);

    // *REAL API
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5678/api/products')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const cleanedProducts = data.map((product) => ({
                    ...product,
                    img: product.image.replace(/^"+|"+$/g, ''),
                    colors: product.colors,
                }));
                setProducts(cleanedProducts);
                console.log('Cleaned products data:', cleanedProducts);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Body>
                <div>Loading products...</div>
            </Body>
        );
    }

    if (error) {
        return (
            <Body>
                <div>Error: {error}</div>
            </Body>
        );
    }

    return (
        <Body>
            <HeaderFullText>
                Vicious Store.
                <span className="text-gray-500 ml-2">
                    Cách tốt nhất để mua sản phẩm bạn thích
                </span>
            </HeaderFullText>
            <GridCard>
                {products.map((product) => (
                    <div key={product.id}>
                        <ProductCard
                            img={product.img}
                            name={product.name}
                            price={formatPrice(product.price)}
                            colors={product.colors}
                        />
                    </div>
                ))}
            </GridCard>
        </Body>
    );
};

export default Home;
