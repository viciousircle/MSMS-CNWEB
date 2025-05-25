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

                // Use item.price, fallback to item.product.price
                let price = 0;
                if (typeof item.price === 'number') {
                    price = item.price;
                } else if (item.price) {
                    price = Number(item.price);
                } else if (item.product && item.product.price) {
                    price = Number(item.product.price);
                }

                // Only format if price is a valid number
                const formattedTotal =
                    !isNaN(price) && !isNaN(item.quantity)
                        ? formatPrice(price * item.quantity)
                        : '0';

                return (
                    <li key={index} className="flex justify-between">
                        <span>
                            {productName} ({item.color}) × {item.quantity}
                        </span>
                        <span>{formattedTotal} VND</span>
                    </li>
                );
            })}
        </ul>
    </div>
);

export default OrderItems;
