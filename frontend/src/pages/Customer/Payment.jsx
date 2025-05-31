import React from 'react';
import { usePaymentLogic } from '@/hooks/payment/usePaymentLogic.hook';
import { PaymentView } from '@/components/Payment/PaymentView';

// XXX: Payment done
const Payment = () => {
    const paymentLogic = usePaymentLogic();

    return <PaymentView {...paymentLogic} />;
};

export default Payment;
