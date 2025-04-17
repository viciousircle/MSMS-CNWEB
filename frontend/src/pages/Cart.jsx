import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Body';
import { HeaderWithIcon } from '@/components/Header';
import CardLayout from '@/components/CardLayout';
import { CartTotal } from '@/components/Footer';
import CartProductCard from '@/components/Cards/CartProductCard';
import Label from '@/components/Label';
import useCart from '@/hooks/useCart.hook';
import { Checkbox } from '@/components/ui/checkbox';
import { Section, SectionItem } from '@/components/Section';
const Cart = () => {
    const {
        products,
        checkedProducts,
        handleProductCheck,
        handleCheckAll,
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
                <Section>
                    <SectionItem
                        className="cursor-pointer"
                        onClick={() => handleCheckAll(!allChecked)}
                    >
                        <Checkbox
                            className="size-6"
                            checked={allChecked}
                            onCheckedChange={(checked) =>
                                handleCheckAll(checked)
                            }
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
                            />
                        ))}
                    </CardLayout>
                </div>
            </Body>
            <CartTotal />
        </>
    );
};

export default Cart;
