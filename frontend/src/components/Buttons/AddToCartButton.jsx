import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CircleCheck, AlertTriangle, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { api } from '/utils/api';

const AddToCartButton = ({ onClose, product, selectedColor, quantity }) => {
    const [lastClickTime, setLastClickTime] = useState(0);
    const cooldown = 1000;

    const handleClick = async () => {
        const now = Date.now();
        if (now - lastClickTime < cooldown) {
            toast(
                <div className="flex items-center gap-2 text-yellow-600">
                    <AlertTriangle />
                    <span>You're clicking too fast! Please wait.</span>
                </div>
            );
            return;
        }

        setLastClickTime(now);

        try {
            await api('/cart', {
                method: 'POST',
                body: JSON.stringify({
                    productId: product._id,
                    color: selectedColor,
                    quantity,
                    dateAdded: new Date(),
                }),
            });

            toast(
                <div className="flex items-center gap-2 text-green-600">
                    <CircleCheck />
                    <span>Item added to cart successfully!</span>
                </div>
            );

            onClose();
        } catch (error) {
            toast(
                <div className="flex items-center gap-2 text-red-600">
                    <XCircle />
                    <span>{error.message || 'Failed to add item.'}</span>
                </div>
            );
        }
    };

    return (
        <Button
            className="flex-1 hover:bg-emerald-600 hover:text-white bg-white border-emerald-600 border text-emerald-600"
            onClick={handleClick}
        >
            Add to Cart
        </Button>
    );
};

export default AddToCartButton;
