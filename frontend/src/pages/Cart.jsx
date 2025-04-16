import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Body';
import { HeaderWithIcon } from '@/components/Header';
import CheckBox from '@/components/Checkbox';
import { LinearCard } from '@/components/Decoration';
import { CartTotal } from '@/components/Footer';
import CartProductCard from '@/components/Cards/CartProductCard';
import Label from '@/components/Label';
import useCart from '@/hooks/useCart.hook';

const Cart = () => {
    const {
        products,
        checkedProducts,
        handleProductCheck,
        handleAllProductsCheck,
        allChecked,
        loading,
        error,
    } = useCart();

    console.log('Products:', products);

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <>
            <Body>
                <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />

                <CheckBox
                    title="Products"
                    checked={allChecked}
                    onChange={(e) => handleAllProductsCheck(e.target.checked)}
                />

                <div className="flex flex-col gap-4">
                    <Label titles={['Products', `${products.length} ITEMS`]} />
                    <LinearCard>
                        {products.map((product) => (
                            <CartProductCard
                                key={product._id}
                                product={product}
                                isChecked={
                                    checkedProducts[product._id] || false
                                }
                                onCheckChange={handleProductCheck}
                            />
                        ))}
                    </LinearCard>
                </div>
            </Body>
            <CartTotal />
        </>
    );
};

export default Cart;
