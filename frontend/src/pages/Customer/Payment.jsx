import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateOrder } from '@/hooks/payment/useCreateOrder.hook';
import { useOrderValidation } from '@/hooks/payment/useOrderValidation.hook';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Footer from '@/components/Structure/Footer';
import PaymentReceiverCard from '@/components/Cards/PaymentReceiverCard';
import BillCard from '@/components/Cards/BillCard/BillCard';
import PaymentDetails from '@/components/Payment/PaymentDetails';
import QRPaymentDialog from '@/components/Payment/QRPaymentDialog';
import OrderSuccessDialog from '@/components/Payment/OrderSuccessDialog';

// Constants
const SHIPPING_COST = 30000;
const TEST_AMOUNT = 10000; // Fixed amount for testing VietQR
const BANK_INFO = {
    bankName: 'VietinBank',
    bankCode: 'vietinbank',
    accountNumber: '106873633198',
    accountName: 'MSMS CN WEB',
};

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const products = location.state?.products || [];

    const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
    const [error, setError] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [isOrderSuccessDialogOpen, setIsOrderSuccessDialogOpen] =
        useState(false);

    const { createOrder, isLoading, error: orderError } = useCreateOrder();
    const { validateOrder, buildOrderData } = useOrderValidation();

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

    const handlePaymentMethodChange = (method) => {
        if (method === 'qr') {
            setIsQRDialogOpen(true);
        }
    };

    const handleCheckout = async () => {
        const receiverInfo = JSON.parse(
            localStorage.getItem('receiverInfo') || '{}'
        );
        const validation = validateOrder(products, receiverInfo);

        if (!validation.isValid) {
            setError(validation.errors[0]);
            return;
        }

        setError(null);

        try {
            const data = buildOrderData(products, receiverInfo);
            await createOrder(data);

            setOrderData(data);
            setIsQRDialogOpen(false);
            setIsOrderSuccessDialogOpen(true);
        } catch (err) {
            console.error('Order failed:', err);
            setError('Failed to place order. Please try again.');
        }
    };

    const handlePrintInvoice = () => {
        window.print();
    };

    const handleTrackOrder = () => {
        console.log('View order status:', orderData);
    };

    if (!isAuthenticated()) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <HeaderWithIcon icon={BanknotesIcon} title="Payment" />
                <PaymentReceiverCard />
                <PaymentDetails products={products} />

                <BillCard
                    merchandiseSubtotal={merchandiseSubtotal}
                    shippingSubtotal={SHIPPING_COST}
                    onPaymentMethodChange={handlePaymentMethodChange}
                />

                <QRPaymentDialog
                    isOpen={isQRDialogOpen}
                    onOpenChange={setIsQRDialogOpen}
                    total={TEST_AMOUNT}
                    bankInfo={BANK_INFO}
                    error={error}
                    orderError={orderError}
                    isLoading={isLoading}
                    onCheckout={handleCheckout}
                />

                <OrderSuccessDialog
                    isOpen={isOrderSuccessDialogOpen}
                    onOpenChange={setIsOrderSuccessDialogOpen}
                    orderData={orderData}
                    onPrint={handlePrintInvoice}
                    onTrackOrder={handleTrackOrder}
                />
            </Body>
            <Footer />
        </div>
    );
};

export default Payment;
