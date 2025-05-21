import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import PaymentCard from '@/components/Cards/PaymentProductCard';
import CardLayout from '@/components/Layouts/CardLayout';
import Label from '@/components/Others/Label';
import PaymentReceiverCard from '@/components/Cards/PaymentReceiverCard';
import BillCard from '@/components/Cards/BillCard/BillCard';
import VietQR from '@/components/Payment/VietQR';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { api } from '/utils/api';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/Structure/Footer';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const products = location.state?.products || [];
    const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [isOrderSuccessDialogOpen, setIsOrderSuccessDialogOpen] =
        useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login', { state: { from: '/payment', products } });
        }
    }, [isAuthenticated, navigate, products]);

    const parsePrice = (price) =>
        typeof price === 'string' ? Number(price.replace(/\./g, '')) : price;

    const merchandiseSubtotal = products.reduce((acc, product) => {
        const price = parsePrice(product.price);
        return acc + price * product.quantity;
    }, 0);

    const shippingSubtotal = 30000;
    // For testing VietQR, we'll use a fixed amount of 10,000 VND
    const total = 10000; // Fixed amount for testing

    // Mock bank info - In real app, this should come from your backend
    const bankInfo = {
        bankName: 'VietinBank',
        bankCode: 'vietinbank', // VietQR.io bank code
        accountNumber: '106873633198',
        accountName: 'MSMS CN WEB',
    };

    // Handle payment method change
    const handlePaymentMethodChange = (method) => {
        if (method === 'qr') {
            setIsQRDialogOpen(true);
        }
    };

    const validateOrder = () => {
        if (!products?.length) {
            setError('No products in cart');
            return false;
        }

        const receiverInfo = JSON.parse(
            localStorage.getItem('receiverInfo') || '{}'
        );
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

    const buildOrderData = () => {
        const receiverInfo = JSON.parse(
            localStorage.getItem('receiverInfo') || '{}'
        );
        return {
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
            paymentMethod: 'QR',
            orderDate: new Date().toISOString(),
            totalAmount: products.reduce(
                (sum, product) => sum + (product.price || 0) * product.quantity,
                0
            ),
        };
    };

    const handleCheckout = async () => {
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
            setIsQRDialogOpen(false);
            setIsOrderSuccessDialogOpen(true);
        } catch (err) {
            console.error('Order failed:', err);
            setError('Failed to place order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

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
                Order ID: #
                {Math.random().toString(36).substring(2, 10).toUpperCase()}
                <br />
                Date: {new Date(order.orderDate).toLocaleString()}
            </div>
        </div>
    );

    if (!isAuthenticated()) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <HeaderWithIcon icon={BanknotesIcon} title="Payment" />
                <PaymentReceiverCard />
                <PaymentDetails products={products} />

                <BillCard
                    merchandiseSubtotal={merchandiseSubtotal}
                    shippingSubtotal={shippingSubtotal}
                    onPaymentMethodChange={handlePaymentMethodChange}
                />

                <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Scan QR Code to Pay</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                            <VietQR
                                amount={total}
                                orderId={`ORD-${Date.now()}`}
                                bankInfo={bankInfo}
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 p-3 bg-red-50 rounded-md mt-4">
                                {error}
                            </div>
                        )}
                        <DialogFooter className="mt-6">
                            <button
                                className="bg-black text-white px-16 py-2 shadow-inner hover:text-black hover:bg-gray-950/5 transition duration-300 cursor-pointer tracking-widest font-medium font-serif uppercase w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleCheckout}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : 'Check out'}
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <AlertDialog
                    open={isOrderSuccessDialogOpen}
                    onOpenChange={setIsOrderSuccessDialogOpen}
                >
                    <AlertDialogContent id="print-area">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-center text-lg font-medium text-green-600">
                                Order Placed Successfully!
                            </AlertDialogTitle>
                            <AlertDialogDescription className="space-y-4">
                                {orderData && (
                                    <OrderSummary order={orderData} />
                                )}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Back to Store</AlertDialogCancel>
                            <button
                                className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-md"
                                onClick={() => window.print()}
                            >
                                Print Invoice
                            </button>
                            <AlertDialogAction
                                onClick={() =>
                                    console.log('View order status:', orderData)
                                }
                            >
                                Track Order
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Body>
            <Footer />
        </div>
    );
};

const PaymentDetails = ({ products }) => {
    return (
        <div className="flex flex-col gap-4">
            <Label
                titles={[
                    'Products',
                    `${products.length} ITEM${products.length > 1 ? 'S' : ''}`,
                ]}
            />
            <CardLayout variant="linear">
                {products.map((product, index) => (
                    <PaymentCard key={index} product={product} />
                ))}
            </CardLayout>
        </div>
    );
};

export default Payment;
