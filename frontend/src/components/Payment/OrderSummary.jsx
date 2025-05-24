import React from 'react';
import DeliveryInformation from './DeliveryInformation';
import OrderItems from './OrderItems';
import { formatDisplayId } from '/utils/idConverter';

const OrderSummary = ({ order }) => (
    <div className="space-y-3">
        {order?.receiverInformation && (
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
        )}

        <div className="border-b pb-3">
            <h3 className="font-semibold text-gray-900">Payment Method</h3>
            <p>{order.paymentMethod}</p>
        </div>

        <div>
            <h3 className="font-semibold text-gray-900">Order Items</h3>
            <OrderItems orderItems={order.orderItems} />
        </div>

        {order.totalAmount && (
            <div className="border-t pt-3 text-right font-semibold">
                Total: ${order.totalAmount.toFixed(2)}
            </div>
        )}

        <div className="text-sm text-gray-500 mt-4">
            Order ID: {order._id ? formatDisplayId(order._id, '#') : 'N/A'}
            <br />
            Date:{' '}
            {order.orderDate
                ? new Date(order.orderDate).toLocaleString()
                : 'N/A'}
        </div>
    </div>
);

export default OrderSummary;
