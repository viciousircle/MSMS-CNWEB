import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const CartProductCard = ({
    product = {},
    isChecked = false,
    onCheckChange = () => {},
    onQuantityChange = () => {},
    onDelete = () => {},
}) => {
    const {
        _id = '',
        name = '',
        price = 0,
        image = '',
        quantity = 1,
        stock = 0,
        color = '',
    } = product;

    const isOutOfStock = stock <= 0;

    const handleQuantityChange = (newQty) => {
        if (!isOutOfStock) {
            const clampedQty = Math.max(1, Math.min(stock, newQty));
            console.log(`Changing quantity of ${_id} to`, clampedQty); // 👈 debug
            onQuantityChange(_id, clampedQty);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <Divider horizontal />
            <div className="flex w-full">
                <Divider vertical />
                <CardContent
                    id={_id}
                    name={name}
                    image={image}
                    price={price}
                    quantity={quantity}
                    stock={stock}
                    color={color}
                    isChecked={isChecked}
                    isOutOfStock={isOutOfStock}
                    onCheckChange={onCheckChange}
                    onQuantityChange={handleQuantityChange}
                    onDelete={onDelete}
                />
                <Divider vertical />
            </div>
            <Divider horizontal />
        </div>
    );
};

const CardContent = ({
    id,
    name,
    image,
    price,
    quantity,
    stock,
    isChecked,
    isOutOfStock,
    onCheckChange,
    onQuantityChange,
    color,
    onDelete,
}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const updateQuantity = (delta) => {
        const newQuantity = quantity + delta;
        onQuantityChange(id, newQuantity); // Pass `id` here
    };
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await onDelete(id); // Call the delete function with the ID
        } catch (error) {
            console.error('Error deleting item:', error);
            // Error is already handled in the hook, but you could show a toast here
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div
            className={`flex w-full gap-4 min-w-max border border-gray-950/5 p-4 ${
                isChecked
                    ? 'bg-gray-950/2.5'
                    : isOutOfStock
                    ? 'bg-gray-950/5 cursor-not-allowed'
                    : ''
            }`}
        >
            <div className="flex items-center">
                <Checkbox
                    className="size-5"
                    checked={isChecked}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={(checked) =>
                        !isOutOfStock && onCheckChange(id, checked)
                    }
                />
            </div>
            <ProductImage src={image} dimmed={isOutOfStock} />
            <ProductInfo
                name={name}
                price={price}
                quantity={quantity}
                color={color}
                stock={stock}
                dimmed={isOutOfStock}
                updateQuantity={updateQuantity}
                onDelete={handleDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
};

const ProductImage = React.memo(({ src, dimmed }) => (
    <div className="flex w-1/5 h-64 items-center justify-center bg-white rounded-lg outline outline-gray-950/5">
        <img
            src={src}
            alt="Product"
            className={`w-64 object-contain ${
                dimmed ? 'opacity-70' : 'opacity-100'
            }`}
        />
    </div>
));

const ProductInfo = ({
    name,
    price,
    quantity,
    stock,
    dimmed,
    updateQuantity,
    color,
    onDelete,
    isDeleting = false,
}) => {
    const handleInputChange = (e) => {
        const value = e.target.value;
        // Allow empty value for better UX when user is typing
        if (value === '') {
            updateQuantity(0 - quantity); // This will be clamped by parent
            return;
        }

        const newQty = parseInt(value, 10);
        if (!isNaN(newQty)) {
            // Calculate the difference from current quantity
            const diff = newQty - quantity;
            updateQuantity(diff);
        }
    };

    return (
        <div className="flex flex-col w-full gap-2 px-4 justify-center">
            <div
                className={`flex justify-between items-center ${
                    dimmed ? 'opacity-70' : 'opacity-100'
                }`}
            >
                <span className="text-2xl font-medium hover:underline">
                    {name}
                </span>
                <div className="flex gap-2 items-center">
                    <div>
                        <span className="tracking-wider">Color</span>
                    </div>
                    <div className="border border-gray-300 px-2 py-1 rounded-md bg-gray-950/2.5 text-sm text-gray-500">
                        {color}
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="tracking-wider">Quantity</span>
                    <QuantityControls
                        quantity={quantity}
                        stock={stock}
                        dimmed={dimmed}
                        onChange={updateQuantity}
                        onInputChange={handleInputChange}
                    />
                </div>
                <span className="font-mono">{price}</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-2">
                <span className="text-gray-500">
                    {stock > 0 ? `Available: ${stock}` : 'Out of stock'}
                </span>
                <button
                    className={`text-red-500 hover:underline cursor-pointer ${
                        isDeleting ? 'opacity-50' : 'opacity-100'
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
};

const QuantityControls = ({
    quantity,
    stock,
    dimmed,
    onChange,
    onInputChange,
}) => (
    <div className="flex items-center">
        <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
                e.stopPropagation();
                onChange(-1);
            }}
            disabled={dimmed || quantity <= 1}
            className="h-10 px-3 rounded-r-none border-r-0"
        >
            -
        </Button>
        <input
            type="number"
            min={1}
            max={stock}
            value={quantity}
            disabled={dimmed}
            onClick={(e) => e.stopPropagation()}
            onChange={onInputChange}
            onBlur={(e) => {
                // If input is empty or invalid, reset to current quantity
                if (e.target.value === '' || parseInt(e.target.value) < 1) {
                    onInputChange({ target: { value: quantity.toString() } });
                }
            }}
            className="w-16 h-10 text-center border-t border-b border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
                e.stopPropagation();
                onChange(1);
            }}
            disabled={dimmed || quantity >= stock}
            className="h-10 px-3 rounded-l-none border-l-0"
        >
            +
        </Button>
    </div>
);

const Divider = React.memo(({ horizontal }) =>
    horizontal ? (
        <div className="flex w-full">
            <div className="p-2" />
            <div className="border-gray-950/5 border-x p-2 w-full" />
            <div className="p-2" />
        </div>
    ) : (
        <div className="border-gray-950/5 border-y p-2" />
    )
);

export default CartProductCard;
