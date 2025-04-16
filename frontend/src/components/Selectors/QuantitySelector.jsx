import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

const QuantitySelector = React.memo(
    ({ quantity, maxStock, updateQuantity, handleInputChange }) => (
        <div className="p-4 pb-2 flex items-center justify-center space-x-2">
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => updateQuantity(-1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
            >
                <Minus className="h-4 w-4" />
            </Button>
            <input
                type="number"
                className="w-16 text-center text-4xl font-bold bg-transparent border-none focus:outline-none no-spinner"
                value={quantity}
                onChange={handleInputChange}
                min="1"
                max={maxStock}
                aria-label="Quantity input"
            />
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => updateQuantity(1)}
                disabled={quantity >= maxStock}
                aria-label="Increase quantity"
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
);

export default QuantitySelector;
