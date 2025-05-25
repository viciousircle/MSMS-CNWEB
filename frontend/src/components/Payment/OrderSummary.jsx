import React from 'react';
import DeliveryInformation from './DeliveryInformation';
import OrderItems from './OrderItems';
import { formatDisplayId } from '/utils/idConverter';
import { formatPrice } from '/utils/formatPrice';

const OrderSummary = ({ order }) => {
    // Use totalAmount or totalPayment
    const totalRaw = order?.totalAmount ?? order?.totalPayment ?? 0;
    const totalAmount =
        typeof totalRaw === 'string'
            ? parseFloat(totalRaw.replace(/[^0-9.-]+/g, ''))
            : Number(totalRaw);
    const formattedTotal = !isNaN(totalAmount) ? formatPrice(totalAmount) : '0';

    // Use orderDate or createdAt
    const dateRaw = order?.orderDate ?? order?.createdAt;
    const formattedDate = dateRaw ? new Date(dateRaw).toLocaleString() : 'N/A';

    return (
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
                <OrderItems orderItems={order.orderItems} />
            </div>

            <div className="border-t pt-3 text-right font-semibold">
                Total: {formattedTotal} VND
            </div>

            <div className="text-sm text-gray-500 mt-4">
                Order ID: {order._id ? formatDisplayId(order._id, '#') : 'N/A'}
                <br />
                Date: {formattedDate}
            </div>
        </div>
    );
};

export default OrderSummary;
