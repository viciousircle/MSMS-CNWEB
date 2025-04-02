import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CircleCheck, AlertTriangle } from "lucide-react";
import React, { useState } from "react";

const AddToCartButton = () => {
    const [lastClickTime, setLastClickTime] = useState(0);
    const cooldown = 10000; // 1 second cooldown

    const handleClick = () => {
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
        toast(
            <div className="flex items-center gap-2 text-green-600">
                <CircleCheck />
                <span>Item added to cart successfully!</span>
            </div>
        );
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
