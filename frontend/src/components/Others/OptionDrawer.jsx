import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import CancelButton from '../Buttons/CancelButton';
import AddToCartButton from '../Buttons/AddToCartButton';
import BuyButton from '../Buttons/BuyButton';
import QuantitySelector from '../Selectors/QuantitySelector';
import ColorSelector from '../Selectors/ColorSelector';
import useProductOptions from '@/hooks/useProductOption.hook';
const OptionDrawer = ({ product }) => {
    const { name, colors } = product;

    const {
        selectedColor,
        setSelectedColor,
        quantity,
        isOpen,
        setIsOpen,
        updateQuantity,
        handleInputChange,
        currentColorStock,
    } = useProductOptions(colors);

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">View Details</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{name}</DrawerTitle>
                    </DrawerHeader>
                    <ColorSelector
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
                                product={product}
                                selectedColor={selectedColor}
                                quantity={quantity}
                            />
                            <BuyButton
                                product={product}
                                selectedColor={selectedColor}
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

const StockInfo = React.memo(({ stock }) => (
    <div className="px-4 text-sm text-gray-500">
        Available: {stock > 0 ? stock : 'Out of stock'}
    </div>
));

export default OptionDrawer;
