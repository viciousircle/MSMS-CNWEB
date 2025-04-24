import React from 'react';
import { Button } from '@/components/ui/button';

const QuantityControls = ({ quantity, stock, isDisabled, onChange }) => {
    const handleDecrement = (e) => {
        e.stopPropagation();
        onChange(-1);
    };

    const handleIncrement = (e) => {
        e.stopPropagation();
        onChange(1);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === '') {
            onChange(0 - quantity);
            return;
        }

        const newQty = parseInt(value, 10);
        if (!isNaN(newQty)) {
            const diff = newQty - quantity;
            onChange(diff);
        }
    };

    const handleBlur = (e) => {
        if (e.target.value === '' || parseInt(e.target.value) < 1) {
            handleInputChange({
                target: { value: quantity.toString() },
            });
        }
    };

    return (
        <div className="flex items-center">
            <Button
                variant="outline"
                size="sm"
                onClick={handleDecrement}
                disabled={isDisabled || quantity <= 1}
                className="h-10 px-3 rounded-r-none border-r-0"
            >
                -
            </Button>
            <input
                type="number"
                min={1}
                max={stock}
                value={quantity}
                disabled={isDisabled}
                onClick={(e) => e.stopPropagation()}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="w-16 h-10 text-center border-t border-b border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <Button
                variant="outline"
                size="sm"
                onClick={handleIncrement}
                disabled={isDisabled || quantity >= stock}
                className="h-10 px-3 rounded-l-none border-l-0"
            >
                +
            </Button>
        </div>
    );
};

export default QuantityControls;
