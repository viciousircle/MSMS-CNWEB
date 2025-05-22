import { useState, useCallback } from 'react';
import { paymentApi } from '/utils/api/payment.api';

export const usePayment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const createPayment = useCallback(async (paymentData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await paymentApi.createPayment(paymentData);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to create payment');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkPaymentStatus = useCallback(async (paymentId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await paymentApi.getPaymentStatus(paymentId);
            setPaymentStatus(response.status);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to check payment status');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const verifyPayment = useCallback(async (paymentId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await paymentApi.verifyPayment(paymentId);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to verify payment');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        createPayment,
        checkPaymentStatus,
        verifyPayment,
        paymentStatus,
        isLoading,
        error,
    };
};
