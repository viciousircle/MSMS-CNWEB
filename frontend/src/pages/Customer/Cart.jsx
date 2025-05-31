import React, { useEffect, useState } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
// import CartContent from '@/components/CartContent';

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

    const [isInitialLoad, setIsInitialLoad] = useState(true);

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
        const timer = setTimeout(() => {
            setIsInitialLoad(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [fetchCart]);

    const error = fetchError || updateError || deleteError;
    const loading = isFetching;

    if (loading) return <LoadingState icon={ShoppingCartIcon} title="Cart" />;
    if (error)
        return (
            <ErrorState icon={ShoppingCartIcon} title="Cart" error={error} />
        );

    const SelectAllSection = () => (
        <div>
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
        </div>
    );

    const ProductList = () => (
        <div className="flex flex-col gap-4">
            <Label titles={['Products', `${cart.length} ITEMS`]} />
            <CardLayout variant="linear">
                {cart.map((item) => (
                    <div key={item._id}>
                        <CartProductCard
                            product={item}
                            isChecked={checkedProducts[item._id] || false}
                            onCheckChange={handleProductCheck}
                            onDelete={handleDeleteItem}
                            onQuantityChange={updateQuantity}
                        />
                    </div>
                ))}
            </CardLayout>
        </div>
    );

    const CartContent = () => {
        if (cart.length === 0) return <CartNotFound />;

        return (
            <AnimatePresence>
                {isInitialLoad && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 15,
                            delay: 0.1,
                        }}
                    >
                        <SelectAllSection />
                        <ProductList />
                    </motion.div>
                )}
                {!isInitialLoad && (
                    <div>
                        <SelectAllSection />
                        <ProductList />
                    </div>
                )}
            </AnimatePresence>
        );
    };

    const shouldShowCartTotal =
        cart.length > 0 && Object.values(checkedProducts).some(Boolean);

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />
                <CartContent />
            </Body>

            {shouldShowCartTotal && (
                <CartTotal
                    products={cart.filter((p) => checkedProducts[p._id])}
                    checkedProducts={checkedProducts}
                />
            )}
            <Footer />
        </div>
    );
};

export default Cart;
