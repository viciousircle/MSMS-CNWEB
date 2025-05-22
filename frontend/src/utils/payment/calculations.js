export const parsePrice = (price) =>
    typeof price === 'string' ? Number(price.replace(/\./g, '')) : price;

export const calculateMerchandiseSubtotal = (products) => {
    return products.reduce((acc, product) => {
        const price = parsePrice(product.price);
        return acc + price * product.quantity;
    }, 0);
};

export const calculateTotal = (merchandiseSubtotal, shippingCost) => {
    return merchandiseSubtotal + shippingCost;
};
