import React from 'react';
import PropTypes from 'prop-types';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartItemQuantity = ({
    id,
    quantity,
    stock,
    isOutOfStock,
    onQuantityChange,
}) => {
    const handleDecrease = () => {
        if (quantity > 1) {
            onQuantityChange(id, quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < stock) {
            onQuantityChange(id, quantity + 1);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={handleDecrease}
                disabled={quantity <= 1 || isOutOfStock}
                className="h-8 w-8 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm font-medium text-gray-900">
                {quantity}
            </span>
            <Button
                variant="outline"
                size="icon"
                onClick={handleIncrease}
                disabled={quantity >= stock || isOutOfStock}
                className="h-8 w-8 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
};

CartItemQuantity.propTypes = {
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    isOutOfStock: PropTypes.bool,
    onQuantityChange: PropTypes.func.isRequired,
};

export default CartItemQuantity;
