import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CartNotFound from '@/components/NotFounds/CartNotFound';
import SelectAllSection from './SelectAllSection';
import ProductList from './ProductList';

const CartContent = ({
    cart,
    isInitialLoad,
    handleDeleteItem,
    updateQuantity,
}) => {
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
                    <SelectAllSection cart={cart} />
                    <ProductList
                        cart={cart}
                        handleDeleteItem={handleDeleteItem}
                        updateQuantity={updateQuantity}
                    />
                </motion.div>
            )}
            {!isInitialLoad && (
                <div>
                    <SelectAllSection cart={cart} />
                    <ProductList
                        cart={cart}
                        handleDeleteItem={handleDeleteItem}
                        updateQuantity={updateQuantity}
                    />
                </div>
            )}
        </AnimatePresence>
    );
};

export default CartContent;
