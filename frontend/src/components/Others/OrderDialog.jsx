import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { api } from '/utils/api';

const OrderDialog = ({ products, receiverInfo, onOrderSuccess }) => {
    const [orderData, setOrderData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const validateOrder = () => {
        if (!products?.length) {
            setError('No products in cart');
            return false;
        }

        if (
            !receiverInfo?.name ||
            !receiverInfo?.phone ||
            !receiverInfo?.address
        ) {
            setError('Please complete receiver information');
            return false;
        }

        return true;
    };

    const formatAddress = (address) =>
        `${address.number}, ${address.street}, ${address.ward}, ${address.district}, ${address.province}`;

    const buildOrderData = () => ({
        orderItems: products.map((product) => ({
            product: product.id,
            productName: product.name,
            color: product.color,
            quantity: product.quantity,
            price: product.price,
        })),
        receiverInformation: {
            receiverName: receiverInfo.name,
            receiverPhone: receiverInfo.phone,
            receiverAddress: formatAddress(receiverInfo.address),
        },
        paymentMethod: 'COD',
        orderDate: new Date().toISOString(),
        totalAmount: products.reduce(
            (sum, product) => sum + (product.price || 0) * product.quantity,
            0
        ),
    });

    const handleOrder = async () => {
        if (!validateOrder()) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = buildOrderData();
            console.log('Sending order data:', data);

            const result = await api('/orders/', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            console.log('Order response:', result);
            setOrderData(data);
            onOrderSuccess?.(result);
        } catch (err) {
            console.error('Order failed:', err);
            setError('Failed to place order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const generateOrderId = () =>
        Math.random().toString(36).substring(2, 10).toUpperCase();

    const OrderSummary = ({ order }) => (
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

    const DialogActions = () => (
        <AlertDialogFooter>
            <AlertDialogCancel>Back to Store</AlertDialogCancel>
            <Button variant="destructive" onClick={() => window.print()}>
                Print Invoice
            </Button>
            {orderData && (
                <AlertDialogAction
                    onClick={() => console.log('View order status:', orderData)}
                >
                    Track Order
                </AlertDialogAction>
            )}
        </AlertDialogFooter>
    );

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    className="bg-black text-white px-16 py-2 shadow-inner hover:text-black hover:bg-gray-950/5 transition duration-300 cursor-pointer tracking-widest font-medium font-serif"
                    onClick={handleOrder}
                    disabled={isLoading}
                >
                    {isLoading ? 'Placing Order...' : 'Order Now'}
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent id="print-area">
                <AlertDialogHeader>
                    <AlertDialogTitle
                        className={`text-center text-lg font-medium ${
                            error ? 'text-red-600' : 'text-green-600'
                        }`}
                    >
                        {error ? 'Order Failed' : 'Order Placed Successfully!'}
                    </AlertDialogTitle>

                    <AlertDialogDescription className="space-y-4">
                        {error && (
                            <div className="text-red-500 p-3 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}
                        {orderData && <OrderSummary order={orderData} />}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <DialogActions />
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default OrderDialog;
