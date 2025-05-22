import React from 'react';

const QuantityInput = ({ quantity, stock, isDisabled, onChange, onBlur }) => {
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
        onBlur?.(e);
    };

    return (
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
    );
};

export default QuantityInput;
