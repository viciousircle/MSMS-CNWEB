import React from 'react';

const OrderMetadata = ({ orderDate }) => (
    <div className="text-sm text-gray-500 mt-4">
        Order ID: #{Math.random().toString(36).substring(2, 10).toUpperCase()}
        <br />
        Date: {new Date(orderDate).toLocaleString()}
    </div>
);

export default OrderMetadata;
