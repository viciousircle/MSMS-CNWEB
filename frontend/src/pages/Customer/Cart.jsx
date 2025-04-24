import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import CardLayout from '@/components/Layouts/CardLayout';
import CartProductCard from '@/components/Cards/CartProductCard';
import Label from '@/components/Others/Label';
import { Checkbox } from '@/components/ui/checkbox';
import { Section, SectionItem } from '@/components/Layouts/SectionLayout';
import useCart from '@/hooks/useCart.hook';
import CartTotal from '@/components/Others/CartTotal';

const Cart = () => {
    const {
        products,
        checkedProducts,
        allChecked,
        error,
        loading,
        handleProductCheck,
        handleCheckAll,
        deleteCartItem,
    } = useCart();

    const handleDeleteItem = async (deletedId) => {
        try {
            await deleteCartItem(deletedId);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    if (loading) {
        return <div>Loading cart...</div>;
    }

    if (error) {
        return <div>Error loading cart: {error.message}</div>;
    }

    const renderCartContent = () => {
        if (products.length === 0) {
            return <div className="text-center py-8">Your cart is empty</div>;
        }

        return (
            <>
                <Section>
                    <SectionItem
                        className="cursor-pointer"
                        onClick={() => handleCheckAll(!allChecked)}
                    >
                        <Checkbox
                            className="size-6"
                            checked={allChecked}
                            onCheckedChange={handleCheckAll}
                        />
                        <div>Select All</div>
                    </SectionItem>
                </Section>

                <div className="flex flex-col gap-4">
                    <Label titles={['Products', `${products.length} ITEMS`]} />
                    <CardLayout variant="linear">
                        {products.map((product) => (
                            <CartProductCard
                                key={product._id}
                                product={product}
                                isChecked={
                                    checkedProducts[product._id] || false
                                }
                                onCheckChange={handleProductCheck}
                                onDelete={handleDeleteItem}
                            />
                        ))}
                    </CardLayout>
                </div>
            </>
        );
    };

    return (
        <>
            <Body>
                <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />
                {renderCartContent()}
            </Body>

            {products.length > 0 && <CartTotal products={products} />}
        </>
    );
};

export default Cart;
