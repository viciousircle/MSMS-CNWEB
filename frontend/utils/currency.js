export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
        .format(amount * 1_000_000)
        .replace('₫', 'VND');
};
