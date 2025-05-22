export const PAYMENT_CONSTANTS = {
    SHIPPING_COST: 30000,
    TEST_AMOUNT: 10000, // Fixed amount for testing VietQR

    BANK_INFO: {
        bankName: 'VietinBank',
        bankCode: 'vietinbank',
        accountNumber: '106873633198',
        accountName: 'MSMS CN WEB',
    },

    PAYMENT_METHODS: {
        QR: 'QR',
        CASH: 'CASH',
        CREDIT_CARD: 'CREDIT_CARD',
    },

    PAYMENT_STATUS: {
        PENDING: 'pending',
        COMPLETED: 'completed',
        FAILED: 'failed',
    },
};
