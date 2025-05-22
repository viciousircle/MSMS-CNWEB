import React from 'react';

const OrderItems = ({ orderItems }) => (
    <div>
        <h3 className="font-semibold text-gray-900">Order Items</h3>
        <ul className="space-y-2 mt-2">
            {orderItems.map((item, index) => (
                <li key={index} className="flex justify-between">
                    <span>
                        {item.productName || `Product ${item.product}`} (
                        {item.color}) × {item.quantity}
                    </span>
                    {item.price && (
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    )}
                </li>
            ))}
        </ul>
    </div>
);

export default OrderItems;
