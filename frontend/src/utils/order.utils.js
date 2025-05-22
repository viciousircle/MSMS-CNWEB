export const validateOrder = (products, receiverInfo) => {
    if (!products?.length) {
        return {
            isValid: false,
            error: 'No products in cart',
        };
    }

    if (!receiverInfo?.name || !receiverInfo?.phone || !receiverInfo?.address) {
        return {
            isValid: false,
            error: 'Please complete receiver information',
        };
    }

    return { isValid: true };
};

export const formatAddress = (address) =>
    `${address.number}, ${address.street}, ${address.ward}, ${address.district}, ${address.province}`;

export const buildOrderData = (products, receiverInfo) => ({
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
    paymentMethod: 'COD',
    orderDate: new Date().toISOString(),
    totalAmount: products.reduce(
        (sum, product) => sum + (product.price || 0) * product.quantity,
        0
    ),
});
