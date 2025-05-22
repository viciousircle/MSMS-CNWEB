import React from 'react';
import DeliveryInformation from './DeliveryInformation';
import OrderItems from './OrderItems';
import OrderMetadata from './OrderMetadata';

const OrderSummary = ({ order }) => (
    <div className="space-y-3">
        <DeliveryInformation receiverInformation={order.receiverInformation} />

        <div className="border-b pb-3">
            <h3 className="font-semibold text-gray-900">Payment Method</h3>
            <p>{order.paymentMethod}</p>
        </div>

        <OrderItems orderItems={order.orderItems} />

        {order.totalAmount && (
            <div className="border-t pt-3 text-right font-semibold">
                Total: ${order.totalAmount.toFixed(2)}
            </div>
        )}

        <OrderMetadata orderDate={order.orderDate} />
    </div>
);

export default OrderSummary;
