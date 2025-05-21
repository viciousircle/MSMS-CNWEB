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
import { useFetchCart } from '@/hooks/cart/useFetchCart.hook';

const LoadingCart = () => (
    <Body>
        <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    </Body>
);

const ErrorCart = ({ error }) => (
    <Body>
        <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />
        <CardLayout variant="linear">
            <div className="p-4 text-center">
                <p className="text-red-500 mb-2 bg-red-100 flex items-center justify-center px-4 py-2 rounded-lg w-fit text-center">
                    <div>Error loading cart: {error.message}</div>
                </p>
                <button
                    className="text-blue-500 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </div>
        </CardLayout>
    </Body>
);

const Cart = () => {
    const {
        checkedProducts,
        allChecked,
        error,
        loading,
        handleProductCheck,
        handleCheckAll,
        deleteCartItem,
        updateCartItemQuantity,
    } = useCart();

    const { cart, loading: cartLoading, error: cartError } = useFetchCart();

    const handleDeleteItem = async (deletedId) => {
        try {
            await deleteCartItem(deletedId);
            console.log('Item deleted successfully');
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    if (loading) {
        return <LoadingCart />;
    }

    if (error) {
        return <ErrorCart error={error} />;
    }

    const renderSelectAll = () => (
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

    const renderProducts = () => (
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

    const renderCartContent = () => {
        if (cart.length === 0) {
            return <CartNotFound />;
        }

        return (
            <>
                {renderSelectAll()}
                {renderProducts()}
            </>
        );
    };

    return (
        <>
            <Body>
                <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />
                {renderCartContent()}
            </Body>

            {cart.length > 0 && (
                <CartTotal
                    products={cart.filter((p) => checkedProducts[p._id])}
                    checkedProducts={checkedProducts}
                />
            )}
        </>
    );
};

export default Cart;
