import React from 'react';
import QuantityControls from '../Controls/QuantityControls';

const CartItemQuantity = ({
    quantity,
    stock,
    isOutOfStock,
    onQuantityChange,
    id,
}) => {
    const handleQuantityChange = (newQuantity) => {
        if (!isOutOfStock) {
            onQuantityChange(id, newQuantity);
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <span className="tracking-wider">Quantity</span>
            <QuantityControls
                quantity={quantity}
                stock={stock}
                isDisabled={isOutOfStock}
                onChange={handleQuantityChange}
            />
        </div>
    );
};

export default CartItemQuantity;
