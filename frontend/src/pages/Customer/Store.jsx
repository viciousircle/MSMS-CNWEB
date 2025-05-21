import { HeaderFullText } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import CardLayout from '@/components/Layouts/CardLayout';
import { formatPrice } from '/utils/formatPrice';
import { useFetchProducts } from '@/hooks/public/useFetchProducts.hook';
import StandardProductCard from '@/components/Cards/StandardProductCard';

const Store = () => {
    const { products, loading, error } = useFetchProducts();

    if (error) {
        return (
            <Body>
                <div>Error: {error}</div>
            </Body>
        );
    }

    if (loading) {
        return (
            <Body>
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
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
