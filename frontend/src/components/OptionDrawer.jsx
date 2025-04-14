import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import CancelButton from './Buttons/CancelButton';
import AddToCartButton from './Buttons/AddToCartButton';
import BuyButton from './Buttons/BuyButton';

const OptionDrawer = ({ colors }) => {
    const [selectedColor, setSelectedColor] = useState(colors[0]?.color || '');
    const [quantity, setQuantity] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    // Get current color's stock
    const currentColorStock =
        colors.find((c) => c.color === selectedColor)?.stock || 0;

    // Reset quantity when color changes
    useEffect(() => {
        setQuantity(1);
    }, [selectedColor]);

    const updateQuantity = useCallback(
        (amount) => {
            setQuantity((prev) => {
                const newQuantity = prev + amount;
                return Math.max(1, Math.min(currentColorStock, newQuantity));
            });
        },
        [currentColorStock]
    );

    const handleInputChange = useCallback(
        (event) => {
            const value = event.target.value;
            setQuantity(
                value === ''
                    ? 1
                    : Math.max(
                          1,
                          Math.min(currentColorStock, parseInt(value, 10) || 1)
                      )
            );
        },
        [currentColorStock]
    );

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">View Details</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Product Options</DrawerTitle>
                    </DrawerHeader>
                    <ColorSelection
                        colors={colors}
                        selectedColor={selectedColor}
                        onColorChange={setSelectedColor}
                    />
                    <StockInfo stock={currentColorStock} />
                    <QuantitySelector
                        quantity={quantity}
                        maxStock={currentColorStock}
                        updateQuantity={updateQuantity}
                        handleInputChange={handleInputChange}
                    />
                    <DrawerFooter>
                        <div className="flex w-full gap-2">
                            <AddToCartButton
                                onClose={() => setIsOpen(false)}
                                color={selectedColor}
                                quantity={quantity}
                            />
                            <BuyButton
                                color={selectedColor}
                                quantity={quantity}
                            />
                        </div>
                        <CancelButton onClose={() => setIsOpen(false)} />
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

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

const StockInfo = React.memo(({ stock }) => (
    <div className="px-4 text-sm text-gray-500">
        Available: {stock > 0 ? stock : 'Out of stock'}
    </div>
));

const ColorSelection = React.memo(
    ({ colors, selectedColor, onColorChange }) => {
        return (
            <div className="p-4 flex gap-4 items-center">
                <span className="block text-sm font-medium text-gray-700">
                    Select Color:
                </span>
                <Select value={selectedColor} onValueChange={onColorChange}>
                    <SelectTrigger className=" bg-gray-950/2.5 rounded-md flex justify-center px-4 py-1">
                        <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                        {colors.map(({ color, stock }) => (
                            <SelectItem
                                key={color}
                                value={color}
                                disabled={stock === 0}
                            >
                                <div className="flex items-center gap-2 text-sm">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                            backgroundColor:
                                                color.toLowerCase(),
                                            border:
                                                color.toLowerCase() === 'white'
                                                    ? '1px solid #ccc'
                                                    : 'none',
                                        }}
                                    ></div>
                                    <span>
                                        {color}{' '}
                                        {stock === 0 ? '(Out of stock)' : ``}
                                    </span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    }
);

export default OptionDrawer;
