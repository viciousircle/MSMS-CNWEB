import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateOrder } from '@/hooks/payment/useCreateOrder.hook';
import { useOrderValidation } from '@/hooks/payment/useOrderValidation.hook';
import { useQRPayment } from '@/hooks/payment/useQRPayment.hook';
import { PAYMENT_CONSTANTS } from '@/constants/payment.constants';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Footer from '@/components/Structure/Footer';
import PaymentReceiverCard from '@/components/Cards/PaymentReceiverCard';
import BillCard from '@/components/Cards/BillCard/BillCard';
import PaymentDetails from '@/components/Payment/PaymentDetails';
import QRPaymentDialog from '@/components/Payment/QRPaymentDialog';
import OrderSuccessDialog from '@/components/Payment/OrderSuccessDialog';

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

    const {
        createOrder,
        isLoading: isOrderLoading,
        error: orderError,
    } = useCreateOrder();
    const { validateOrder, buildOrderData } = useOrderValidation();
    const {
        generateQRPayment,
        isLoading: isQRLoading,
        error: qrError,
    } = useQRPayment();

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
        if (method === PAYMENT_CONSTANTS.PAYMENT_METHODS.QR) {
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
            const order = await createOrder(data);

            // Generate QR code for the order
            await generateQRPayment(
                PAYMENT_CONSTANTS.TEST_AMOUNT,
                order.id,
                PAYMENT_CONSTANTS.BANK_INFO
            );

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
                    shippingSubtotal={PAYMENT_CONSTANTS.SHIPPING_COST}
                    onPaymentMethodChange={handlePaymentMethodChange}
                />

                <QRPaymentDialog
                    isOpen={isQRDialogOpen}
                    onOpenChange={setIsQRDialogOpen}
                    total={PAYMENT_CONSTANTS.TEST_AMOUNT}
                    bankInfo={PAYMENT_CONSTANTS.BANK_INFO}
                    error={error || qrError}
                    orderError={orderError}
                    isLoading={isOrderLoading || isQRLoading}
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
