import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateOrder } from '@/hooks/payment/useCreateOrder.hook';
import { useOrderValidation } from '@/hooks/payment/useOrderValidation.hook';
import { useQRPayment } from '@/hooks/payment/useQRPayment.hook';
import { PAYMENT_CONSTANTS } from '@/constants/payment.constants';
import { ORDER_CONSTANTS } from '@/constants/order.constants';
import { calculateMerchandiseSubtotal } from '@/utils/payment/calculations';
import {
    handlePaymentMethod,
    handlePrintInvoice,
} from '@/utils/payment/methods';
import { toast } from 'sonner';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Footer from '@/components/Structure/Footer';
import PaymentReceiverCard from '@/components/Cards/PaymentReceiverCard';
import BillCard from '@/components/Cards/BillCard/BillCard';
import PaymentDetails from '@/components/Payment/PaymentDetails';
import QRPaymentDialog from '@/components/Payment/QRPaymentDialog';
import OrderSuccessDialog from '@/components/Payment/OrderSuccessDialog';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();
    const products = location.state?.products || [];

    const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
    const [error, setError] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [isOrderSuccessDialogOpen, setIsOrderSuccessDialogOpen] =
        useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
        ORDER_CONSTANTS.PAYMENT_METHODS.COD
    );

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
        if (!loading && !isAuthenticated()) {
            navigate('/login', { state: { from: '/payment', products } });
        }
    }, [isAuthenticated, loading, navigate, products]);

    const merchandiseSubtotal = calculateMerchandiseSubtotal(products);

    const handlePaymentMethodChange = (method) => {
        console.log('Payment method changed to:', method);
        handlePaymentMethod(method, setIsQRDialogOpen);
        setSelectedPaymentMethod(method);
    };

    const handleQRDialogClose = () => {
        console.log('QR Dialog closed, resetting to COD');
        setIsQRDialogOpen(false);
        setSelectedPaymentMethod(ORDER_CONSTANTS.PAYMENT_METHODS.COD);
    };

    const handleCheckout = async () => {
        const receiverInfo = JSON.parse(
            localStorage.getItem('receiverInfo') || '{}'
        );
        const validation = validateOrder(products, receiverInfo);

        if (!validation.isValid) {
            setError(validation.errors[0]);
            toast.error(
                'Please provide complete receiver information before checkout.'
            );
            return;
        }

        setError(null);

        try {
            const data = buildOrderData(products, receiverInfo);
            data.paymentMethod = selectedPaymentMethod;
            const orderResponse = await createOrder(data);
            const order = orderResponse.order;

            if (selectedPaymentMethod === ORDER_CONSTANTS.PAYMENT_METHODS.QR) {
                // Generate QR code for the order
                await generateQRPayment(
                    merchandiseSubtotal + PAYMENT_CONSTANTS.SHIPPING_COST,
                    order.id,
                    PAYMENT_CONSTANTS.BANK_INFO
                );
            }

            setOrderData(order);
            setIsQRDialogOpen(false);
            setIsOrderSuccessDialogOpen(true);
        } catch (err) {
            console.error('Order failed:', err);
            setError('Failed to place order. Please try again.');
        }
    };

    if (loading) {
        return null; // or a loading spinner
    }

    if (!isAuthenticated()) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <HeaderWithIcon icon={BanknotesIcon} title="Payment" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <PaymentReceiverCard />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <PaymentDetails products={products} />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <BillCard
                            merchandiseSubtotal={merchandiseSubtotal}
                            shippingSubtotal={PAYMENT_CONSTANTS.SHIPPING_COST}
                            onPaymentMethodChange={handlePaymentMethodChange}
                            onCheckout={handleCheckout}
                            selectedPaymentMethod={selectedPaymentMethod}
                        />
                    </motion.div>
                </motion.div>

                <QRPaymentDialog
                    isOpen={isQRDialogOpen}
                    onOpenChange={handleQRDialogClose}
                    total={
                        merchandiseSubtotal + PAYMENT_CONSTANTS.SHIPPING_COST
                    }
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
                    onPrint={() => handlePrintInvoice()}
                    error={error || orderError}
                />
            </Body>
            <Footer />
        </div>
    );
};

export default Payment;
