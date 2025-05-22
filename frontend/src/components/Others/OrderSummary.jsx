import React from 'react';

const OrderSummary = ({ order }) => {
    const generateOrderId = () =>
        Math.random().toString(36).substring(2, 10).toUpperCase();

    return (
        <div className="space-y-3">
            <div className="border-b pb-3">
                <h3 className="font-semibold text-gray-900">
                    Delivery Information
                </h3>
                <p>
                    <strong>Receiver:</strong>{' '}
                    {order.receiverInformation.receiverName}
                </p>
                <p>
                    <strong>Phone:</strong>{' '}
                    {order.receiverInformation.receiverPhone}
                </p>
                <p>
                    <strong>Address:</strong>{' '}
                    {order.receiverInformation.receiverAddress}
                </p>
            </div>

            <div className="border-b pb-3">
                <h3 className="font-semibold text-gray-900">Payment Method</h3>
                <p>{order.paymentMethod}</p>
            </div>

            <div>
                <h3 className="font-semibold text-gray-900">Order Items</h3>
                <ul className="space-y-2 mt-2">
                    {order.orderItems.map((item, index) => (
                        <li key={index} className="flex justify-between">
                            <span>
                                {item.productName || `Product ${item.product}`}{' '}
                                ({item.color}) × {item.quantity}
                            </span>
                            {item.price && (
                                <span>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {order.totalAmount && (
                <div className="border-t pt-3 text-right font-semibold">
                    Total: ${order.totalAmount.toFixed(2)}
                </div>
            )}

            <div className="text-sm text-gray-500 mt-4">
                Order ID: #{generateOrderId()}
                <br />
                Date: {new Date(order.orderDate).toLocaleString()}
            </div>
        </div>
    );
};

export default OrderSummary;
