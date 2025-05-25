'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CancelButton from '../Buttons/CancelButton';
import AddToCartButton from '../Buttons/AddToCartButton';
import BuyButton from '../Buttons/BuyButton';
import QuantitySelector from '../Selectors/QuantitySelector';
import ColorSelector from '../Selectors/ColorSelector';
import useProductOptions from '@/hooks/useProductOption.hook';
import { toast } from 'sonner';
import { XCircle } from 'lucide-react';

const OptionDrawer = ({ product }) => {
    const { name, colors, image, price, _id } = product;

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

    // Find the selected color object (if color-specific prices exist)
    const selectedColorObj = colors?.find((c) => c.color === selectedColor);
    // Use color-specific price if available, otherwise fallback to product price
    const colorPrice = selectedColorObj?.price ?? price;

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('drawer-open');
        } else {
            document.body.classList.remove('drawer-open');
        }

        return () => {
            document.body.classList.remove('drawer-open');
        };
    }, [isOpen]);

    const productData = {
        id: _id,
        name,
        img: image,
        color: selectedColor,
        quantity,
        price:
            typeof price === 'string'
                ? parseFloat(price.replace(/[,.]/g, ''))
                : price,
    };

    const handleBuyClick = (e) => {
        if (currentColorStock <= 0) {
            e.preventDefault();
            toast(
                <div className="flex items-center gap-2 text-red-600">
                    <XCircle />
                    <span>This product is out of stock!</span>
                </div>
            );
            return;
        }
    };

    return (
        <>
            <Button variant="outline" onClick={() => setIsOpen(true)}>
                View Details
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 z-50"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 300,
                            }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-lg"
                        >
                            <div className="mx-auto w-full max-w-sm">
                                <div className="p-4">
                                    <div className="mb-4">
                                        <h2 className="text-lg font-semibold">
                                            {name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Select your preferred color and
                                            quantity
                                        </p>
                                    </div>

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

                                    <div className="mt-4 space-y-2">
                                        <div className="flex w-full gap-2">
                                            <AddToCartButton
                                                onClose={() => setIsOpen(false)}
                                                product={product}
                                                selectedColor={selectedColor}
                                                quantity={quantity}
                                            />
                                            <BuyButton
                                                products={[productData]}
                                                className="flex-1 bg-black text-white hover:bg-gray-800 rounded-md text-sm flex justify-center items-center"
                                                onClick={handleBuyClick}
                                            />
                                        </div>
                                        <div className="flex w-full">
                                            <CancelButton
                                                onClose={() => setIsOpen(false)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

const StockInfo = React.memo(({ stock }) => (
    <div className="px-4 text-sm text-gray-500">
        Available: {stock > 0 ? stock : 'Out of stock'}
    </div>
));

export default OptionDrawer;
