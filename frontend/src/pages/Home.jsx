// Home.jsx
import ProductCard from '@/components/Cards/ProductCard';
import { HeaderFullText } from '@/components/Header';
import Body from '@/components/Body';
import CardLayout from '@/components/CardLayout';
import { formatPrice } from '/utils/formatPrice';
import SkeletonProductCard from '@/components/Cards/SkeletonProductCard';
import { useProducts } from '@/hooks/useProducts.hook';

const Home = () => {
    const { products, loading, error } = useProducts();

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
                              <ProductCard
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

export default Home;
