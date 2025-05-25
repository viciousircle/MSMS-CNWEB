import React from 'react';
import { formatPrice } from '/utils/formatPrice';

const OrderItems = ({ orderItems = [] }) => (
    <div>
        <h3 className="font-semibold text-gray-900">Order Items</h3>
        <ul className="space-y-2 mt-2">
            {orderItems?.map((item, index) => {
                let productName = item.productName;
                if (
                    !productName &&
                    item.product &&
                    typeof item.product === 'object'
                ) {
                    productName = item.product.name;
                } else if (!productName && typeof item.product === 'string') {
                    productName = `Product ${item.product}`;
                }
                const price =
                    typeof item.price === 'number'
                        ? item.price
                        : Number(item.price);
                const formattedPrice = formatPrice(price);
                const formattedTotal = formatPrice(price * item.quantity);

                return (
                    <li key={index} className="flex justify-between">
                        <span>
                            {productName} ({item.color}) × {item.quantity}
                        </span>
                        {price && !isNaN(price) && (
                            <span>{formattedTotal} VND</span>
                        )}
                    </li>
                );
            })}
        </ul>
    </div>
);

export default OrderItems;
