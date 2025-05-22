import React from 'react';
import { Button } from '@/components/ui/button';

const QuantityButton = ({ type, onClick, disabled, className }) => {
    const handleClick = (e) => {
        e.stopPropagation();
        onClick();
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleClick}
            disabled={disabled}
            className={`h-10 px-3 ${className}`}
        >
            {type === 'decrement' ? '-' : '+'}
        </Button>
    );
};

export default QuantityButton;
