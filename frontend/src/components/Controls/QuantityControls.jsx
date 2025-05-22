import React from 'react';
import QuantityButton from './QuantityButton';
import QuantityInput from './QuantityInput';

const QuantityControls = ({ quantity, stock, isDisabled, onChange }) => {
    const handleDecrement = () => {
        const newQty = Math.max(1, quantity - 1);
        onChange(newQty);
    };

    const handleIncrement = () => {
        const newQty = Math.min(stock, Number(quantity) + 1);
        onChange(newQty);
    };

    return (
        <div className="flex items-center">
            <QuantityButton
                type="decrement"
                onClick={handleDecrement}
                disabled={isDisabled || quantity <= 1}
                className="rounded-r-none border-r-0"
            />
            <QuantityInput
                quantity={quantity}
                stock={stock}
                isDisabled={isDisabled}
                onChange={onChange}
            />
            <QuantityButton
                type="increment"
                onClick={handleIncrement}
                disabled={isDisabled || quantity >= stock}
                className="rounded-l-none border-l-0"
            />
        </div>
    );
};

export default QuantityControls;
