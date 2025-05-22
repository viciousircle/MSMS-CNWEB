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
                className={`flex w-full gap-4 min-w-max border border-gray-950/5 p-4 
                ${isChecked ? 'bg-gray-950/2.5' : ''} 
                ${isOutOfStock ? 'bg-gray-950/5 cursor-not-allowed' : ''}`}
            >
                <CartItemCheckbox
                    id={_id}
                    isChecked={isChecked}
                    isOutOfStock={isOutOfStock}
                    onCheckChange={onCheckChange}
                />

                <div>
                    <ProductImage
                        src={image}
                        dimmed={isOutOfStock}
                        className="w-1/2"
                    />
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
        </ProductCard>
    );
};

export default CartProductCard;
