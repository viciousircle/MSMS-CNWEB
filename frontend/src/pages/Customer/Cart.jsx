import React from 'react';
import { useCartLogic } from '@/hooks/cart/useCartLogic.hook';
import { CartView } from '@/components/Cart/CartView';

// XXX
const Cart = () => {
    const {
        cart,
        checkedProducts,
        isInitialLoad,
        loading,
        error,
        shouldShowCartTotal,
        handleDeleteItem,
        updateQuantity,
        handleCheckAll,
        handleProductCheck,
    } = useCartLogic();

    return (
        <CartView
            cart={cart}
            checkedProducts={checkedProducts}
            isInitialLoad={isInitialLoad}
            loading={loading}
            error={error}
            shouldShowCartTotal={shouldShowCartTotal}
            handleDeleteItem={handleDeleteItem}
            updateQuantity={updateQuantity}
            handleCheckAll={handleCheckAll}
            handleProductCheck={handleProductCheck}
        />
    );
};

export default Cart;
