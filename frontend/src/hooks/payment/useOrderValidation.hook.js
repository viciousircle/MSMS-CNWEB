import { useCallback } from 'react';
import {
    VALIDATION_ERRORS,
    RECEIVER_FIELDS,
} from '@/constants/validation.constants';
import { formatAddress } from '@/utils/format/address.util';
import { mapOrderItems } from '@/utils/format/orderItems.util';

export const useOrderValidation = () => {
    const validateOrder = useCallback((products, receiverInfo) => {
        const errors = [];

        if (!products?.length) {
            errors.push(VALIDATION_ERRORS.NO_PRODUCTS);
        }

        const hasMissingReceiverInfo = RECEIVER_FIELDS.some(
            (field) => !receiverInfo?.[field]
        );

        if (hasMissingReceiverInfo) {
            errors.push(VALIDATION_ERRORS.INCOMPLETE_RECEIVER_INFO);
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }, []);

    const buildOrderData = useCallback((products, receiverInfo) => {
        return {
            orderItems: mapOrderItems(products),
            receiverInformation: {
                receiverName: receiverInfo.name,
                receiverPhone: receiverInfo.phone,
                receiverAddress: formatAddress(receiverInfo.address),
            },
            paymentMethod: 'QR', // Default value, can be overridden
            // TODO: fix this
            orderDate: new Date().toISOString(),
            totalAmount: calculateTotalAmount(products),
        };
    }, []);

    return {
        validateOrder,
        buildOrderData,
    };
};

// Helper function for calculating total amount
const calculateTotalAmount = (products) => {
    return products.reduce(
        (sum, product) => sum + (product.price || 0) * product.quantity,
        0
    );
};
