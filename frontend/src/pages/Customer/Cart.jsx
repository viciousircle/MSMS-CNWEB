import React from 'react';
import { useCartLogic } from '@/hooks/cart/useCartLogic.hook';
import { CartView } from '@/components/Cart/CartView';

// TODO: The BUY NOW SECTION not showing
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
        />
    );
};

export default Cart;
