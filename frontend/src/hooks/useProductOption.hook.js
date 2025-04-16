import { useState, useEffect, useCallback } from 'react';

export default function useProductOptions(colors) {
    const [selectedColor, setSelectedColor] = useState(colors[0]?.color || '');
    const [quantity, setQuantity] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const currentColorStock =
        colors.find((c) => c.color === selectedColor)?.stock || 0;

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

    return {
        selectedColor,
        setSelectedColor,
        quantity,
        setQuantity,
        isOpen,
        setIsOpen,
        updateQuantity,
        handleInputChange,
        currentColorStock,
    };
}
