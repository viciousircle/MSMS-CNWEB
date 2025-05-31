import { useEffect, useState } from 'react';
import { useCartState } from '@/hooks/cart/useCartState.hook';
import { useFetchCart } from '@/hooks/cart/useFetchCart.hook';
import { useUpdateQuantity } from '@/hooks/cart/useUpdateQuantity.hook';
import { useDeleteItem } from '@/hooks/cart/useDeleteItem.hook';

export const useCartLogic = () => {
    const {
        products: cart,
        checkedProducts,
        updateProducts,
        updateProductQuantity,
        removeProduct,
    } = useCartState();

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const {
        fetchCart,
        isLoading: isFetching,
        error: fetchError,
    } = useFetchCart(updateProducts);

    const { updateQuantity, error: updateError } = useUpdateQuantity(
        updateProductQuantity
    );
    const { deleteItem, error: deleteError } = useDeleteItem(removeProduct);

    const handleDeleteItem = async (deletedId) => {
        try {
            await deleteItem(deletedId);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    useEffect(() => {
        fetchCart();
        const timer = setTimeout(() => {
            setIsInitialLoad(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [fetchCart]);

    const error = fetchError || updateError || deleteError;
    const loading = isFetching;

    const shouldShowCartTotal =
        cart.length > 0 && Object.values(checkedProducts).some(Boolean);

    return {
        cart,
        checkedProducts,
        isInitialLoad,
        loading,
        error,
        shouldShowCartTotal,
        handleDeleteItem,
        updateQuantity,
    };
};
