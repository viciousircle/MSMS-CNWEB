import { HeaderFullText } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import CardLayout from '@/components/Layouts/CardLayout';
import { formatPrice } from '/utils/formatPrice';
import SkeletonProductCard from '@/components/Cards/SkeletonProductCard';
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

    return (
        <Body>
            <HeaderFullText>
                Vicious Store.
                <span className="text-gray-500 ml-2">
                    Cách tốt nhất để mua sản phẩm bạn thích
                </span>
            </HeaderFullText>
            <CardLayout variant="grid">
                {loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                          <SkeletonProductCard key={index} />
                      ))
                    : products.map((product) => (
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
