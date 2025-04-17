import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const CartProductCard = ({
    product,
    isChecked,
    onCheckChange,
    onQuantityChange,
}) => {
    const { stock } =
        product.colors.find((c) => c.color === product.color) || {};
    const isOutOfStock = !stock;

    const handleQuantityChange = (newQuantity) => {
        if (isOutOfStock) return;
        onQuantityChange(
            product._id,
            Math.max(1, Math.min(stock, newQuantity))
        );
    };

    return (
        <div className="flex flex-col w-full">
            <Divider horizontal />
            <div className="flex w-full">
                <Divider vertical />
                <CardContent
                    product={product}
                    isChecked={isChecked}
                    isOutOfStock={isOutOfStock}
                    onCheckChange={onCheckChange}
                    handleQuantityChange={handleQuantityChange}
                    stock={stock}
                />
                <Divider vertical />
            </div>
            <Divider horizontal />
        </div>
    );
};

const CardContent = ({
    product,
    isChecked,
    isOutOfStock,
    onCheckChange,
    handleQuantityChange,
    stock,
}) => {
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
                        !isOutOfStock && onCheckChange(product._id, checked)
                    }
                />
            </div>
            <ProductImage image={product.image} isOutOfStock={isOutOfStock} />
            <ProductDetails
                product={{
                    ...product,
                    onQuantityChange: handleQuantityChange,
                }}
                isOutOfStock={isOutOfStock}
                stock={stock}
            />
        </div>
    );
};

const Divider = React.memo(({ horizontal }) =>
    horizontal ? (
        <div className="flex w-full">
            <div className="p-2" />
            <div className="border-gray-950/5 border-x p-2 w-full" />
            <div className="p-2" />
        </div>
    ) : (
        <div className="border-gray-950/5 border-y p-2"></div>
    )
);

const ProductImage = React.memo(({ image, isOutOfStock }) => (
    <div className="flex w-1/5 h-64 items-center justify-center bg-white rounded-lg outline outline-gray-950/5">
        <img
            src={image}
            alt="Product"
            className={`w-64 object-contain ${
                isOutOfStock ? 'opacity-70' : 'opacity-100'
            }`}
        />
    </div>
));

const ProductDetails = ({ product, stock, isOutOfStock }) => {
    const changeQuantity = (delta) =>
        product.onQuantityChange(product.quantity + delta);

    return (
        <div className={`flex flex-col w-full gap-2 px-4 justify-center`}>
            <div
                className={`flex justify-between w-full items-center ${
                    isOutOfStock ? 'opacity-70' : 'opacity-100'
                }`}
            >
                <span className="text-2xl font-medium hover:underline">
                    {product.name}
                </span>
                <div className="flex gap-2 items-center">
                    <div className="flex gap-2 items-center">
                        <span className="tracking-wider">Color</span>
                        <Select>
                            <SelectTrigger className="px-4 py-2 rounded-lg border bg-white shadow-xs cursor-pointer">
                                <SelectValue placeholder={product.color} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Colors</SelectLabel>
                                    {product.colors.map((color) => (
                                        <SelectItem
                                            key={color.color}
                                            value={color.color}
                                            className="capitalize"
                                        >
                                            {color.color}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2 items-center">
                        <span className="tracking-wider">Quantity</span>
                        <div className="flex items-center">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => (
                                    e.stopPropagation(), changeQuantity(-1)
                                )}
                                disabled={isOutOfStock || product.quantity <= 1}
                                className="h-10 px-3 rounded-r-none border-r-0"
                            >
                                -
                            </Button>
                            <input
                                type="number"
                                min={1}
                                max={stock}
                                value={product.quantity}
                                disabled={isOutOfStock}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) =>
                                    changeQuantity(
                                        (parseInt(e.target.value) || 1) -
                                            product.quantity
                                    )
                                }
                                className="w-16 h-10 text-center border-t border-b border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => (
                                    e.stopPropagation(), changeQuantity(1)
                                )}
                                disabled={
                                    isOutOfStock || product.quantity >= stock
                                }
                                className="h-10 px-3 rounded-l-none border-l-0"
                            >
                                +
                            </Button>
                        </div>
                    </div>
                </div>
                <span className="font-mono">{product.price}</span>
            </div>

            <div className="flex justify-between w-full border-t border-gray-300 pt-2">
                <span className="text-gray-500 ">
                    {stock > 0 ? `Available: ${stock}` : 'Out of stock'}
                    {/* TODO: This is wrong Avail must match with the color select */}
                </span>
                <span
                    className="text-red-500 hover:underline cursor-pointer opacity-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    Delete
                </span>
            </div>
        </div>
    );
};

export default CartProductCard;
