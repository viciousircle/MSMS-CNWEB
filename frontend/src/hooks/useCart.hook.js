import { useState } from 'react';

const useCart = () => {
    const mockProducts = [
        {
            _id: '1',
            name: 'Premium Wireless Headphones',
            price: '2.500.000 VND',
            image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-card-40-macbookpro-14-16-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974949535',
            color: 'Black',
            quantity: 1,
            colors: [
                { color: 'Black', stock: 5 },
                { color: 'White', stock: 3 },
                { color: 'Blue', stock: 2 },
            ],
        },
        {
            _id: '2',
            name: 'Ultra HD Smart TV',
            price: '15.000.000 VND',
            image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-card-40-macbookpro-14-16-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974949535',
            color: 'Silver',
            quantity: 1,
            colors: [
                { color: 'Black', stock: 0 },
                { color: 'Silver', stock: 8 },
                { color: 'Gold', stock: 1 },
            ],
        },
        {
            _id: '3',
            name: 'Ergonomic Office Chair',
            price: '3.200.000 VND',
            image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-card-40-macbookpro-14-16-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974949535',
            color: 'Blue',
            quantity: 2,
            colors: [
                { color: 'Black', stock: 10 },
                { color: 'Blue', stock: 4 },
                { color: 'Red', stock: 0 },
            ],
        },
    ];

    const [products, setProducts] = useState(mockProducts);
    const [checkedProducts, setCheckedProducts] = useState(
        mockProducts.reduce((acc, product) => {
            acc[product._id] = false;
            return acc;
        }, {})
    );
    const [loading] = useState(false);
    const [error] = useState(null);

    const handleProductCheck = (id, checked) => {
        setCheckedProducts((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    const handleCheckAll = (checked) => {
        const updated = {};
        products.forEach((p) => {
            const stock = p.colors.find((c) => c.color === p.color)?.stock ?? 0;
            if (stock > 0) {
                updated[p._id] = checked;
            }
        });
        setCheckedProducts(updated);
    };

    const allChecked =
        products.length > 0 &&
        products.every(
            (p) =>
                (checkedProducts[p._id] || false) &&
                (p.colors.find((c) => c.color === p.color)?.stock ?? 0) > 0
        );

    return {
        products,
        checkedProducts,
        handleProductCheck,
        handleCheckAll,
        allChecked,
        loading,
        error,
    };
};

export default useCart;
