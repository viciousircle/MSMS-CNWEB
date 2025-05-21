import { HeaderFullText } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import CardLayout from '@/components/Layouts/CardLayout';
import { formatPrice } from '/utils/formatPrice';
import { useFetchProducts } from '@/hooks/public/useFetchProducts.hook';
import StandardProductCard from '@/components/Cards/StandardProductCard';
import LoadingState from '@/components/States/LoadingState';
import ErrorState from '@/components/States/ErrorState';

const Store = () => {
    const { products, loading, error } = useFetchProducts();

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState error={error} />;
    }

    return (
        <Body>
            <HeaderFullText>
                Vicious Store.
                <span className="text-gray-500 ml-2">
                    Cách tốt nhất để mua sản phẩm bạn thích
                </span>
            </HeaderFullText>
            <CardLayout variant="grid">
                {products.map((product) => (
                    <div key={product.id}>
                        <StandardProductCard
                            product={{
                                ...product,
                                price: formatPrice(product.price),
                            }}
                        />
                    </div>
                ))}
            </CardLayout>
        </Body>
    );
};

export default Store;
