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
    checkedProducts,
    handleCheckAll,
    handleProductCheck,
}) => {
    if (cart.length === 0) return <CartNotFound />;

    const commonProps = {
        cart,
        checkedProducts,
        handleCheckAll,
        handleProductCheck,
        handleDeleteItem,
        updateQuantity,
    };

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
                    <SelectAllSection {...commonProps} />
                    <ProductList {...commonProps} />
                </motion.div>
            )}
            {!isInitialLoad && (
                <div>
                    <SelectAllSection {...commonProps} />
                    <ProductList {...commonProps} />
                </div>
            )}
        </AnimatePresence>
    );
};

export default CartContent;
