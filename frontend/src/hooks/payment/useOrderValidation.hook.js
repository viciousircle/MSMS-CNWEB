import { useCallback } from 'react';

export const useOrderValidation = () => {
    const validateOrder = useCallback((products, receiverInfo) => {
        const errors = [];

        if (!products?.length) {
            errors.push('No products in cart');
        }

        if (
            !receiverInfo?.name ||
            !receiverInfo?.phone ||
            !receiverInfo?.address
        ) {
            errors.push('Please complete receiver information');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }, []);

    const formatAddress = useCallback((address) => {
        if (!address) return '';
        return `${address.number}, ${address.street}, ${address.ward}, ${address.district}, ${address.province}`;
    }, []);

    const buildOrderData = useCallback(
        (products, receiverInfo) => {
            return {
                orderItems: products.map((product) => ({
                    product: product.id,
                    productName: product.name,
                    color: product.color,
                    quantity: product.quantity,
                    price: product.price,
                })),
                receiverInformation: {
                    receiverName: receiverInfo.name,
                    receiverPhone: receiverInfo.phone,
                    receiverAddress: formatAddress(receiverInfo.address),
                },
                paymentMethod: 'QR',
                orderDate: new Date().toISOString(),
                totalAmount: products.reduce(
                    (sum, product) =>
                        sum + (product.price || 0) * product.quantity,
                    0
                ),
            };
        },
        [formatAddress]
    );

    return {
        validateOrder,
        formatAddress,
        buildOrderData,
    };
};
