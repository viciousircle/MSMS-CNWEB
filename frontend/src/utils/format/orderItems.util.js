export const mapOrderItems = (products) => {
    return products.map((product) => ({
        product: product.id,
        productName: product.name,
        color: product.color,
        quantity: product.quantity,
        price: product.price,
    }));
};
