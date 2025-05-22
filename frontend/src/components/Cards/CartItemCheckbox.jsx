import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const CartItemCheckbox = ({ isChecked, isOutOfStock, onCheckChange, id }) => {
    const handleCheckboxChange = (checked) =>
        !isOutOfStock && onCheckChange(id, checked);

    return (
        <div className="flex items-center">
            <Checkbox
                className="size-5"
                checked={isChecked}
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={handleCheckboxChange}
            />
        </div>
    );
};

export default CartItemCheckbox;
