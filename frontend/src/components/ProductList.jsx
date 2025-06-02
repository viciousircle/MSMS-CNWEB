import React from 'react';
import Label from '@/components/Others/Label';
import CardLayout from '@/components/Layouts/CardLayout';
import CartProductCard from '@/components/Cards/CartProductCard';

const ProductList = ({
    cart,
    handleDeleteItem,
    updateQuantity,
    checkedProducts,
    handleProductCheck,
}) => {
    return (
        <div className="flex flex-col gap-4">
            <Label titles={['Products', `${cart.length} ITEMS`]} />
            <CardLayout variant="linear">
                {cart.map((item) => (
                    <div key={item._id}>
                        <CartProductCard
                            product={item}
                            isChecked={checkedProducts[item._id] || false}
                            onCheckChange={handleProductCheck}
                            onDelete={handleDeleteItem}
                            onQuantityChange={updateQuantity}
                        />
                    </div>
                ))}
            </CardLayout>
        </div>
    );
};

export default ProductList;
