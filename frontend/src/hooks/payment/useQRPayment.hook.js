import { useState, useCallback } from 'react';
import { paymentApi } from '/utils/api/payment.api';

// XXX
export const useQRPayment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [qrData, setQrData] = useState(null);

    const generateQRPayment = useCallback(async (amount, orderId, bankInfo) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await paymentApi.generateQRCode(
                amount,
                orderId,
                bankInfo
            );
            setQrData(response.qrData);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to generate QR payment');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkPaymentStatus = useCallback(async (orderId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await paymentApi.checkPaymentStatus(orderId);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to check payment status');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        generateQRPayment,
        checkPaymentStatus,
        qrData,
        isLoading,
        error,
    };
};
