import React from 'react';
import ProductImage from './ProductCards/ProductImage';
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
        <div className="flex flex-col w-full gap-2 px-4 justify-center">
            <div className="flex justify-between items-center">
                <div className="w-full">
                    <ProductInfo
                        name={name}
                        price={`${formattedPrice}`}
                        color={color}
                        stock={stock}
                        dimmed={isOutOfStock}
                        className="w-full"
                        nameClassName="text-xl break-words"
                    />
                </div>

                <CartItemQuantity
                    id={id}
                    quantity={quantity}
                    stock={stock}
                    isOutOfStock={isOutOfStock}
                    onQuantityChange={onQuantityChange}
                />
            </div>

            <div className="flex justify-end border-t border-gray-300 pt-2">
                <DeleteCartItemButton id={id} onDelete={onDelete} />
            </div>
        </div>
    );
};

export default CartItemContent;
