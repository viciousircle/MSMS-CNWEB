import { HeaderFullText } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import CardLayout from '@/components/Layouts/CardLayout';
import { formatPrice } from '/utils/formatPrice';
import { useFetchProducts } from '@/hooks/public/useFetchProducts.hook';
import StandardProductCard from '@/components/Cards/StandardProductCard';
import LoadingState from '@/components/States/LoadingState';
import ErrorState from '@/components/States/ErrorState';
import Footer from '@/components/Structure/Footer';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    containerVariants,
    itemVariants,
    headerVariants,
} from '@/lib/variants/store.variant';

// XXX: Store done
const Store = () => {
    const { products, loading, error } = useFetchProducts();

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState error={error} />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={headerVariants}
                >
                    <HeaderFullText>
                        Vicious Store.
                        <span className="text-gray-500 ml-2">
                            Cách tốt nhất để mua sản phẩm bạn thích.
                        </span>
                    </HeaderFullText>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <CardLayout variant="grid">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                transition={{ duration: 0.2 }}
                            >
                                <StandardProductCard
                                    product={{
                                        ...product,
                                        price: formatPrice(product.price),
                                    }}
                                />
                            </motion.div>
                        ))}
                    </CardLayout>
                </motion.div>
            </Body>

            <Footer />
        </div>
    );
};

export default Store;
