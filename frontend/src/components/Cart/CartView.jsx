import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import CartTotal from '@/components/Others/CartTotal';
import LoadingState from '@/components/States/LoadingState';
import ErrorState from '@/components/States/ErrorState';
import Footer from '@/components/Structure/Footer';
import CartContent from '@/components/CartContent';

export const CartView = ({
    cart,
    checkedProducts,
    isInitialLoad,
    loading,
    error,
    shouldShowCartTotal,
    handleDeleteItem,
    updateQuantity,
}) => {
    if (loading) return <LoadingState icon={ShoppingCartIcon} title="Cart" />;
    if (error)
        return (
            <ErrorState icon={ShoppingCartIcon} title="Cart" error={error} />
        );

    console.log('Checked products:', checkedProducts);

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />
                <CartContent
                    cart={cart}
                    isInitialLoad={isInitialLoad}
                    handleDeleteItem={handleDeleteItem}
                    updateQuantity={updateQuantity}
                    checkedProducts={checkedProducts}
                />
            </Body>

            {shouldShowCartTotal && (
                <CartTotal
                    products={cart.filter((p) => checkedProducts[p._id])}
                    checkedProducts={checkedProducts}
                />
            )}
            <Footer />
        </div>
    );
};
