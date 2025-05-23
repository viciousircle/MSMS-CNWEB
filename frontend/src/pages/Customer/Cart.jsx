import React, { useEffect } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import CardLayout from '@/components/Layouts/CardLayout';
import CartProductCard from '@/components/Cards/CartProductCard';
import Label from '@/components/Others/Label';
import { Checkbox } from '@/components/ui/checkbox';
import { Section, SectionItem } from '@/components/Layouts/SectionLayout';
import { useCartState } from '@/hooks/cart/useCartState.hook';
import { useFetchCart } from '@/hooks/cart/useFetchCart.hook';
import { useUpdateQuantity } from '@/hooks/cart/useUpdateQuantity.hook';
import { useDeleteItem } from '@/hooks/cart/useDeleteItem.hook';
import CartTotal from '@/components/Others/CartTotal';
import CartNotFound from '@/components/NotFounds/CartNotFound';
import LoadingState from '@/components/States/LoadingState';
import ErrorState from '@/components/States/ErrorState';
import Footer from '@/components/Structure/Footer';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

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
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: {
            duration: 0.3,
        },
    },
};

const Cart = () => {
    const {
        products: cart,
        checkedProducts,
        allChecked,
        updateProducts,
        updateProductQuantity,
        removeProduct,
        handleProductCheck,
        handleCheckAll,
    } = useCartState();

    const {
        fetchCart,
        isLoading: isFetching,
        error: fetchError,
    } = useFetchCart(updateProducts);

    const { updateQuantity, error: updateError } = useUpdateQuantity(
        updateProductQuantity
    );
    const { deleteItem, error: deleteError } = useDeleteItem(removeProduct);

    const handleDeleteItem = async (deletedId) => {
        try {
            await deleteItem(deletedId);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const error = fetchError || updateError || deleteError;
    const loading = isFetching;

    if (loading) return <LoadingState icon={ShoppingCartIcon} title="Cart" />;
    if (error)
        return (
            <ErrorState icon={ShoppingCartIcon} title="Cart" error={error} />
        );

    const SelectAllSection = () => (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Section>
                <SectionItem
                    className="cursor-pointer"
                    onClick={() => handleCheckAll(!allChecked)}
                >
                    <Checkbox
                        className="size-6"
                        checked={allChecked}
                        onCheckedChange={handleCheckAll}
                    />
                    <div>Select All</div>
                </SectionItem>
            </Section>
        </motion.div>
    );

    const ProductList = () => (
        <motion.div
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Label titles={['Products', `${cart.length} ITEMS`]} />
            <CardLayout variant="linear">
                <AnimatePresence>
                    {cart.map((item) => (
                        <motion.div
                            key={item._id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                        >
                            <CartProductCard
                                product={item}
                                isChecked={checkedProducts[item._id] || false}
                                onCheckChange={handleProductCheck}
                                onDelete={handleDeleteItem}
                                onQuantityChange={updateQuantity}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </CardLayout>
        </motion.div>
    );

    const CartContent = () => {
        if (cart.length === 0) return <CartNotFound />;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <SelectAllSection />
                <ProductList />
            </motion.div>
        );
    };

    const shouldShowCartTotal =
        cart.length > 0 && Object.values(checkedProducts).some(Boolean);

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />
                </motion.div>
                <CartContent />
            </Body>

            <AnimatePresence>
                {shouldShowCartTotal && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CartTotal
                            products={cart.filter(
                                (p) => checkedProducts[p._id]
                            )}
                            checkedProducts={checkedProducts}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer />
        </div>
    );
};

export default Cart;
