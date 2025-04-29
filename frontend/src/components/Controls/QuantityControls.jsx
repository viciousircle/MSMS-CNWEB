import React from 'react';
import { Button } from '@/components/ui/button';

const QuantityControls = ({ quantity, stock, isDisabled, onChange }) => {
    const handleDecrement = (e) => {
        e.stopPropagation();
        const newQty = Math.max(1, quantity - 1);
        onChange(newQty);
    };

    const handleIncrement = (e) => {
        e.stopPropagation();
        console.log('Incrementing quantity');
        const newQty = Math.min(stock, Number(quantity) + 1);
        console.log('New quantity:', newQty);
        onChange(newQty);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === '') {
            onChange(1); // Default to 1 if empty
            return;
        }

        const newQty = parseInt(value, 10);
        if (!isNaN(newQty)) {
            onChange(Math.max(1, Math.min(stock, newQty)));
        }
    };

    const handleBlur = (e) => {
        if (e.target.value === '' || parseInt(e.target.value) < 1) {
            onChange(1); // Reset to 1 if invalid
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
