import { useState, useMemo } from 'react';

const mockProducts = [
    {
        _id: '1',
        name: 'Premium Wireless Headphones',
        price: '2.500.000 VND',
        image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-card-40-macbookpro-14-16-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974949535',
        color: 'Black',
        stock: 10,
        quantity: 1,
    },
    {
        _id: '2',
        name: 'Ultra HD Smart TV',
        price: '15.000.000 VND',
        image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-card-40-macbookpro-14-16-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974949535',
        color: 'Silver',
        stock: 5,
        quantity: 1,
    },
    {
        _id: '3',
        name: 'Ergonomic Office Chair',
        price: '3.200.000 VND',
        image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-card-40-macbookpro-14-16-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974949535',
        color: 'Blue',
        stock: 1,
        quantity: 2,
    },
];

const initializeCheckedProducts = (products) =>
    products.reduce((acc, { _id }) => {
        acc[_id] = false;
        return acc;
    }, {});

const useCart = () => {
    const [products, setProducts] = useState(mockProducts);
    const [checkedProducts, setCheckedProducts] = useState(() =>
        initializeCheckedProducts(mockProducts)
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
        const updatedChecked = products.reduce((acc, { _id, stock }) => {
            if (stock > 0) acc[_id] = checked;
            return acc;
        }, {});
        setCheckedProducts(updatedChecked);
    };

    const allChecked = useMemo(() => {
        return (
            products.length > 0 &&
            products.every(
                ({ _id, stock }) => stock > 0 && checkedProducts[_id]
            )
        );
    }, [products, checkedProducts]);

    return {
        products,
        checkedProducts,
        handleProductCheck,
        handleCheckAll,
        allChecked,
        loading,
        error,
        setProducts,
    };
};

export default useCart;
