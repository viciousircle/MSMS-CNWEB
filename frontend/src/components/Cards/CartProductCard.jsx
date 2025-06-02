import React from 'react';
import ProductCard from './ProductCards/ProductCard';
import { DEFAULT_PRODUCT } from '@/constants/cartProductConfig';
import CartItemCheckbox from './CartItemCheckbox';
import CartItemContent from './CartItemContent';
import ProductImage from './ProductCards/ProductImage';

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
                className={`group relative flex w-full bg-white border border-gray-100 hover:border-gray-200 transition-all duration-200 ${
                    isChecked ? 'bg-gray-50' : ''
                } ${isOutOfStock ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
                <div className="flex items-center p-4 border-r border-gray-100">
                    <CartItemCheckbox
                        id={_id}
                        isChecked={isChecked}
                        isOutOfStock={isOutOfStock}
                        onCheckChange={onCheckChange}
                    />
                </div>

                <div className="flex-1 flex gap-8 p-4">
                    <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center">
                        <ProductImage
                            src={image}
                            dimmed={isOutOfStock}
                            className="w-full h-full flex items-center justify-center"
                            imgClassName="w-24 h-24 object-contain"
                        />
                        {isOutOfStock && (
                            <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-500">
                                    Out of stock
                                </span>
                            </div>
                        )}
                    </div>

                    <CartItemContent
                        id={_id}
                        name={name}
                        image={image}
                        price={price}
                        quantity={quantity}
                        stock={stock}
                        color={color}
                        isOutOfStock={isOutOfStock}
                        onQuantityChange={handleQuantityChange}
                        onDelete={onDelete}
                    />
                </div>
            </div>
        </ProductCard>
    );
};

export default CartProductCard;
