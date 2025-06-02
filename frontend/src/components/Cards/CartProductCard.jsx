import React from 'react';
import ProductCard from './ProductCards/ProductCard';
import { DEFAULT_PRODUCT } from '@/constants/cartProductConfig';
import CartItemCheckbox from './CartItemCheckbox';
import ProductImage from './ProductCards/ProductImage';
import CartItemQuantity from './CartItemQuantity';
import DeleteCartItemButton from '../Buttons/DeleteCartItemButton';

const CartProductCard = ({
    product = DEFAULT_PRODUCT,
    isChecked = false,
    onCheckChange = () => {},
    onQuantityChange = () => {},
    onDelete = () => {},
}) => {
    const { _id, name, price, image, quantity, stock, color } = product;
    const isOutOfStock = stock <= 0;

    const handleQuantityChange = (id, newQty) => {
        if (isOutOfStock) return;
        const validatedQty = Math.max(1, Math.min(stock, Number(newQty)));
        onQuantityChange(id, validatedQty);
    };

    return (
        <ProductCard>
            <div
                className={`group relative flex w-full bg-white border border-gray-100 hover:border-gray-200 transition-all duration-200 items-center px-4 py-6 gap-6 ${
                    isChecked ? 'bg-gray-50' : ''
                } ${isOutOfStock ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
                {/* Checkbox on the far left */}
                <div className="flex items-center justify-center h-full pr-2">
                    <CartItemCheckbox
                        id={_id}
                        isChecked={isChecked}
                        isOutOfStock={isOutOfStock}
                        onCheckChange={onCheckChange}
                    />
                </div>
                {/* Image */}
                <div className="relative w-24 h-24 bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <ProductImage
                        src={image}
                        dimmed={isOutOfStock}
                        className="w-full h-full flex items-center justify-center"
                        imgClassName="w-20 h-20 object-contain"
                    />
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-500">
                                Out of stock
                            </span>
                        </div>
                    )}
                </div>
                {/* Info */}
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                    <span
                        className="font-semibold text-lg text-gray-900 truncate"
                        title={name}
                    >
                        {name}
                    </span>
                    <span className="text-gray-500 text-base font-mono">
                        {price?.toLocaleString()} VND
                    </span>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <span>Color: {color}</span>
                        <span>Available: {stock}</span>
                    </div>
                </div>
                {/* Controls */}
                <div className="flex items-center gap-4 min-w-[110px] justify-end">
                    <CartItemQuantity
                        id={_id}
                        quantity={quantity}
                        stock={stock}
                        isOutOfStock={isOutOfStock}
                        onQuantityChange={handleQuantityChange}
                    />
                    <DeleteCartItemButton id={_id} onDelete={onDelete} />
                </div>
            </div>
        </ProductCard>
    );
};

export default CartProductCard;
