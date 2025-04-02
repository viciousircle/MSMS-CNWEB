import React, { useState } from "react";
import { CheckSquare, Square } from "lucide-react";

const CartProductCard = ({ product, isChecked, onCheckChange }) => {
    // const [isChecked, setIsChecked] = useState(false);

    const isOutOfStock = product.inStock === 0;

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full">
                <div className="p-2" />
                <div className="border-gray-950/5 border-x p-2 w-full" />
                <div className="p-2" />
            </div>

            <div className="flex w-full">
                <div className="border-gray-950/5 border-y p-2" />

                <div
                    className={`flex w-full gap-4 min-w-max border border-gray-950/5 p-2 
                        ${
                            isChecked
                                ? "bg-gray-950/2.5"
                                : isOutOfStock
                                ? "bg-gray-950/5 cursor-not-allowed"
                                : "hover:bg-gray-950/2.5 cursor-pointer"
                        }`}
                    onClick={() =>
                        !isOutOfStock && onCheckChange(product.id, !isChecked)
                    }
                >
                    <Checkbox
                        isChecked={isChecked}
                        onClick={() => onCheckChange(product.id, !isChecked)}
                        isOutOfStock={isOutOfStock}
                    />
                    <ProductImage
                        image={product.image}
                        isOutOfStock={isOutOfStock}
                    />
                    <ProductDetails
                        product={product}
                        isOutOfStock={isOutOfStock}
                    />
                </div>

                <div className="border-gray-950/5 border-y p-2" />
            </div>

            <div className="flex w-full">
                <div className="p-2" />
                <div className="border-gray-950/5 border-x p-2 w-full" />
                <div className="p-2" />
            </div>
        </div>
    );
};

const Checkbox = ({ isChecked, onClick, isOutOfStock }) => (
    <div
        className={`flex items-center pl-2 ${
            isOutOfStock ? "text-gray-100" : "text-gray-400"
        }`}
        onClick={() => !isOutOfStock && onClick()} // Prevent changing state if out of stock
    >
        {isChecked ? (
            <CheckSquare className="text-emerald-600 w-6 h-6" />
        ) : (
            <Square
                className={`w-6 h-6 ${
                    isOutOfStock ? "text-gray-100" : "text-gray-400 "
                }`}
            />
        )}
    </div>
);

const ProductImage = ({ image, isOutOfStock }) => (
    <div className="flex w-1/5 h-64 items-center justify-center bg-white rounded-lg outline outline-gray-950/5">
        <img
            src={image}
            alt="Product"
            className={`w-64 object-contain ${
                isOutOfStock ? "opacity-70" : "opacity-100"
            }`}
        />
    </div>
);

const ProductDetails = ({ product, isOutOfStock }) => (
    <div
        className={`flex flex-col w-full gap-2 px-4 justify-center
        `}
    >
        <div
            className={`flex justify-between w-full items-center
        ${isOutOfStock ? "opacity-70" : "opacity-100"}
        `}
        >
            <span className="text-2xl font-medium hover:underline">
                {product.name}
            </span>
            <div className="flex gap-2 items-center">
                <div className="flex gap-2 items-center">
                    <span className="tracking-wider">Color</span>
                    <div className="p-2 bg-gray-950/2.5 border rounded-sm">
                        {product.color}
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="tracking-wider">Quantity</span>
                    <div className="p-2 bg-gray-950/2.5 border rounded-sm">
                        {product.quantity}
                    </div>
                </div>
            </div>

            <span className="font-mono">{product.price}</span>
        </div>

        <div className="flex justify-between w-full border-t border-gray-300 pt-2">
            <span className="text-gray-500 tracking-widest">
                {product.inStock > 0
                    ? "Available: " + product.inStock
                    : "Out of stock"}
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

export default CartProductCard;
