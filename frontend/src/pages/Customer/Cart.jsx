import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import CardLayout from '@/components/Layouts/CardLayout';
import CartProductCard from '@/components/Cards/CartProductCard';
import Label from '@/components/Others/Label';
import { Checkbox } from '@/components/ui/checkbox';
import { Section, SectionItem } from '@/components/Layouts/SectionLayout';

import useCart from '@/hooks/useCart.hook';

const Cart = () => {
    const {
        products,
        checkedProducts,
        allChecked,
        handleProductCheck,
        handleCheckAll,
    } = useCart();

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
                            />
                        ))}
                    </CardLayout>
                </div>
            </Body>

            <CartTotal />
        </>
    );
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
        .format(amount * 1_000_000)
        .replace('₫', 'VND');
};

const CartTotal = () => {
    const total = 2.5 + 15.0 + 3.2 * 2; // Temporary static total
    const formattedTotal = formatCurrency(total);

    return (
        <div className="fixed bottom-0 left-0 w-full border-t border-gray-950/5 bg-white bg-[image:repeating-linear-gradient(45deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed text-gray-950/5 flex justify-center">
            <div className="flex justify-center bg-white w-fit border-x">
                <div className="font-medium text-black py-4 px-8 bg-gray-950/5">
                    Total: {formattedTotal}
                </div>
                <div className="bg-white text-black border-l border-gray-950/5 cursor-pointer px-16 uppercase tracking-widest font-medium flex items-center justify-center hover:bg-black hover:text-gray-200 transition duration-300">
                    <Link to="/payment">Buy now</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
