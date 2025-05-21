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
import CartNotFound from '@/components/NotFounds/CartNotFound';
import LoadingState from '@/components/States/LoadingState';
import ErrorState from '@/components/States/ErrorState';

const Cart = () => {
    const {
        products: cart,
        checkedProducts,
        allChecked,
        error,
        loading,
        handleProductCheck,
        handleCheckAll,
        deleteCartItem,
        updateCartItemQuantity,
    } = useCart();

    const handleDeleteItem = async (deletedId) => {
        try {
            await deleteCartItem(deletedId);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    if (loading) return <LoadingState icon={ShoppingCartIcon} title="Cart" />;
    if (error)
        return (
            <ErrorState icon={ShoppingCartIcon} title="Cart" error={error} />
        );

    const SelectAllSection = () => (
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
    );

    const ProductList = () => (
        <div className="flex flex-col gap-4">
            <Label titles={['Products', `${cart.length} ITEMS`]} />
            <CardLayout variant="linear">
                {cart.map((item) => (
                    <CartProductCard
                        key={item._id}
                        product={item}
                        isChecked={checkedProducts[item._id] || false}
                        onCheckChange={handleProductCheck}
                        onDelete={handleDeleteItem}
                        onQuantityChange={updateCartItemQuantity}
                    />
                ))}
            </CardLayout>
        </div>
    );

    const CartContent = () => {
        if (cart.length === 0) return <CartNotFound />;

        return (
            <>
                <SelectAllSection />
                <ProductList />
            </>
        );
    };

    const shouldShowCartTotal =
        cart.length > 0 && Object.values(checkedProducts).some(Boolean);

    return (
        <>
            <Body>
                <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />
                <CartContent />
            </Body>

            {shouldShowCartTotal && (
                <CartTotal
                    products={cart.filter((p) => checkedProducts[p._id])}
                    checkedProducts={checkedProducts}
                />
            )}
        </>
    );
};

export default Cart;
