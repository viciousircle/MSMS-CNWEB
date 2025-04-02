import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Minus, Plus } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CancelButton from "./Buttons/CancelButton";
import AddToCartButton from "./Buttons/AddToCartButton";
import OrderButton from "./Buttons/OrderButton";

const OptionDrawer = () => {
    const [quantity, setQuantity] = useState(1);
    const [isOpen, setIsOpen] = useState(false); // Drawer State
    const maxStock = 10;

    const updateQuantity = useCallback((amount) => {
        setQuantity((prev) => Math.max(1, Math.min(maxStock, prev + amount)));
    }, []);

    const handleInputChange = useCallback((event) => {
        const value = event.target.value;
        setQuantity(
            value === ""
                ? ""
                : Math.max(1, Math.min(maxStock, parseInt(value, 10) || 1))
        );
    }, []);

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">View Detail</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Product Options</DrawerTitle>
                    </DrawerHeader>
                    <ColorSelection />
                    <StockInfo maxStock={maxStock} />
                    <QuantitySelector
                        quantity={quantity}
                        updateQuantity={updateQuantity}
                        handleInputChange={handleInputChange}
                    />
                    <DrawerFooter>
                        <div className="flex w-full gap-2">
                            <AddToCartButton onClose={() => setIsOpen(false)} />
                            <OrderButton />
                        </div>
                        <CancelButton onClose={() => setIsOpen(false)} />
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

const QuantitySelector = React.memo(
    ({ quantity, updateQuantity, handleInputChange }) => (
        <div className="p-4 pb-2 flex items-center justify-center space-x-2">
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => updateQuantity(-1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
            >
                <Minus />
            </Button>
            <input
                type="number"
                className="w-16 text-center text-4xl font-bold bg-transparent border-none focus:outline-none no-spinner"
                value={quantity}
                onChange={handleInputChange}
                min="1"
                max="10"
                aria-label="Quantity input"
            />
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => updateQuantity(1)}
                disabled={quantity >= 10}
                aria-label="Increase quantity"
            >
                <Plus />
            </Button>
        </div>
    )
);

const StockInfo = React.memo(({ maxStock }) => (
    <div className="p-4 text-sm text-gray-500">Available: {maxStock}</div>
));

const ColorSelection = React.memo(() => {
    const colors = [
        { value: "black", label: "Black", colorClass: "bg-black" },
        { value: "rose", label: "Rose", colorClass: "bg-rose-600" },
        { value: "amber", label: "Amber", colorClass: "bg-amber-500" },
    ];

    return (
        <div className="p-4 flex gap-4 items-center">
            <span className="block text-sm font-medium text-gray-700">
                Select Color:
            </span>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <Button>
                        Black
                        <ChevronDown className="ml-auto h-4 w-4" />
                    </Button>
                </SelectTrigger>
                <SelectContent>
                    {colors.map(({ value, label, colorClass }) => (
                        <SelectItem key={value} value={value}>
                            <div className="flex items-center gap-2">
                                <div
                                    className={`p-2 ${colorClass} rounded-full`}
                                ></div>
                                <span>{label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
});

export default OptionDrawer;
