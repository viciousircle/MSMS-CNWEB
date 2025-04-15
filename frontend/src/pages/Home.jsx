import ProductCard from '@/components/Cards/ProductCard';
import { HeaderFullText } from '@/components/Header';
import Body from '@/components/Body';
import { GridCard } from '@/components/Decoration';
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
            <GridCard>
                {loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                          <SkeletonProductCard key={index} />
                      ))
                    : products.map((product) => (
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
            <GridCard>
                {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonProductCard key={index} />
                ))}
            </GridCard>
        </Body>
    );
};

export default Home;
