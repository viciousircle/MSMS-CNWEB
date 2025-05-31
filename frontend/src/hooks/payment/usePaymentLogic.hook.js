import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateOrder } from '../order/useCreateOrder.hook';
import { useOrderValidation } from '@/hooks/payment/useOrderValidation.hook';
import { useQRPayment } from '@/hooks/payment/useQRPayment.hook';
import { PAYMENT_CONSTANTS } from '@/constants/payment.constants';
import { ORDER_CONSTANTS } from '@/constants/order.constants';
import { calculateMerchandiseSubtotal } from '@/utils/payment/calculations';
import { handlePaymentMethod } from '@/utils/payment/methods';
import { toast } from 'sonner';
// XXX
export const usePaymentLogic = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, loading: authLoading } = useAuth();
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
        if (!authLoading && !isAuthenticated()) {
            navigate('/login', { state: { from: '/payment', products } });
        }
    }, [isAuthenticated, authLoading, navigate, products]);

    const merchandiseSubtotal = calculateMerchandiseSubtotal(products);

    const handlePaymentMethodChange = (method) => {
        handlePaymentMethod(method, setIsQRDialogOpen);
        setSelectedPaymentMethod(method);
    };

    const handleQRDialogClose = () => {
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

    return {
        products,
        loading: authLoading,
        isAuthenticated: isAuthenticated(),
        isQRDialogOpen,
        error: error || qrError || orderError,
        orderData,
        isOrderSuccessDialogOpen,
        selectedPaymentMethod,
        merchandiseSubtotal,
        isLoading: isOrderLoading || isQRLoading,
        handlePaymentMethodChange,
        handleQRDialogClose,
        handleCheckout,
        setIsOrderSuccessDialogOpen,
    };
};
