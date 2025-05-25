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
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const headerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

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
                            Cách tốt nhất để mua sản phẩm bạn thích
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

            <Drawer>
                <DrawerTrigger>Open</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>
                            This action cannot be undone.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Footer />
        </div>
    );
};

export default Store;
