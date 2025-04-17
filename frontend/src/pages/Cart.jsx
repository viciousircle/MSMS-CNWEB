import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Body';
import { HeaderWithIcon } from '@/components/Header';
import { LinearCard } from '@/components/Decoration';
import { CartTotal } from '@/components/Footer';
import CartProductCard from '@/components/Cards/CartProductCard';
import Label from '@/components/Label';
import useCart from '@/hooks/useCart.hook';
import { Checkbox } from '@/components/ui/checkbox';

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

                <div className="relative">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <div className="flex gap-4 px-4">
                        <div className="text-gray-700 text-pretty font-medium font-mono tracking-widest uppercase flex">
                            <div className="flex border-gray-950/5 border-x items-center px-4 py-2 gap-2 w-full">
                                <Checkbox
                                    className="size-6"
                                    checked={allChecked}
                                    onCheckedChange={(checked) =>
                                        handleCheckAll(checked)
                                    }
                                />

                                <div>Select All</div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                </div>

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
