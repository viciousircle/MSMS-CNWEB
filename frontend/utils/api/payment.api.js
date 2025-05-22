import { api } from '/utils/api';

export const paymentApi = {
    // Since we're using VietQR directly, we don't need to create a payment record
    // Instead, we'll just generate the QR code data
    generateQRCode: async (amount, orderId, bankInfo) => {
        try {
            // For now, we'll return a mock response since the backend endpoint doesn't exist
            // In a real implementation, this would call your backend API
            return {
                qrData: {
                    amount,
                    orderId,
                    bankInfo,
                    // Add any other QR code data needed by your VietQR component
                },
            };
        } catch (error) {
            console.error('Error generating QR code:', error);
            throw error;
        }
    },

    // This would be used to check payment status in a real implementation
    checkPaymentStatus: async (orderId) => {
        try {
            // For now, return a mock response
            return {
                status: 'pending',
                orderId,
            };
        } catch (error) {
            console.error('Error checking payment status:', error);
            throw error;
        }
    },
};
