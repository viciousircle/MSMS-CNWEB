import React from 'react';
import ProductInfo from './ProductCards/ProductInfo';
import DeleteCartItemButton from '../Buttons/DeleteCartItemButton';
import CartItemQuantity from './CartItemQuantity';
import { formatPrice } from '/utils/formatPrice';

const CartItemContent = ({
    id,
    name,
    price,
    quantity,
    stock,
    color,
    isOutOfStock,
    onQuantityChange,
    onDelete,
}) => {
    const formattedPrice = formatPrice(price);

    return (
        <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-2">
                <ProductInfo
                    name={name}
                    price={`${formattedPrice}`}
                    color={color}
                    stock={stock}
                    dimmed={isOutOfStock}
                    className="w-full"
                    nameClassName="text-base font-medium text-gray-900"
                    priceClassName="text-sm font-medium text-gray-500"
                    colorClassName="text-sm text-gray-500"
                    stockClassName="text-sm text-gray-500"
                />
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <CartItemQuantity
                    id={id}
                    quantity={quantity}
                    stock={stock}
                    isOutOfStock={isOutOfStock}
                    onQuantityChange={onQuantityChange}
                />
                <DeleteCartItemButton id={id} onDelete={onDelete} />
            </div>
        </div>
    );
};

export default CartItemContent;
