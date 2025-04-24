import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import ProductCard from './ProductCards/ProductCard';
import ProductImage from './ProductCards/ProductImage';
import ProductInfo from './ProductCards/ProductInfo';
import { DEFAULT_PRODUCT } from '@/constants/cartProductConfig';
import QuantityControls from '../Controls/QuantityControls';
import DeleteCartItemButton from '../Buttons/DeleteCartItemButton';

const CardContent = ({
    id,
    name,
    image,
    price,
    quantity,
    stock,
    color,
    isChecked,
    isOutOfStock,
    onCheckChange,
    onQuantityChange,
    onDelete,
}) => {
    const handleCheckboxChange = (checked) =>
        !isOutOfStock && onCheckChange(id, checked);
    const updateQuantity = (delta) => onQuantityChange(id, quantity + delta);

    return (
        <div
            className={`flex w-full gap-4 min-w-max border border-gray-950/5 p-4 
      ${isChecked ? 'bg-gray-950/2.5' : ''} 
      ${isOutOfStock ? 'bg-gray-950/5 cursor-not-allowed' : ''}`}
        >
            <div className="flex items-center">
                <Checkbox
                    className="size-5"
                    checked={isChecked}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={handleCheckboxChange}
                />
            </div>

            <ProductImage src={image} dimmed={isOutOfStock} className="w-1/5" />

            <div className="flex flex-col w-full gap-2 px-4 justify-center">
                <div className="flex justify-between items-center">
                    <ProductInfo
                        name={name}
                        price={price}
                        color={color}
                        stock={stock}
                        dimmed={isOutOfStock}
                        className="flex-1"
                        nameClassName="text-2xl hover:underline"
                    />
                    <div className="flex gap-2 items-center">
                        <span className="tracking-wider">Quantity</span>
                        <QuantityControls
                            quantity={quantity}
                            stock={stock}
                            isDisabled={isOutOfStock}
                            onChange={updateQuantity}
                        />
                    </div>
                </div>

                <div className="flex justify-end border-t border-gray-300 pt-2">
                    <DeleteCartItemButton id={id} onDelete={onDelete} />
                </div>
            </div>
        </div>
    );
};

const CartProductCard = ({
    product = DEFAULT_PRODUCT,
    isChecked = false,
    onCheckChange = () => {},
    onQuantityChange = () => {},
    onDelete = () => {},
}) => {
    const { _id, name, price, image, quantity, stock, color } = product;
    const isOutOfStock = stock <= 0;

    const handleQuantityChange = (newQty) => {
        if (isOutOfStock) return;
        onQuantityChange(_id, Math.max(1, Math.min(stock, newQty)));
    };

    return (
        <ProductCard>
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
        </ProductCard>
    );
};

export default CartProductCard;
