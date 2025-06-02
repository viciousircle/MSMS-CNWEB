import { useEffect, useState } from 'react';
import { useCartState } from '@/hooks/cart/useCartState.hook';
import { useFetchCart } from '@/hooks/cart/useFetchCart.hook';
import { useUpdateQuantity } from '@/hooks/cart/useUpdateQuantity.hook';
import { useDeleteItem } from '@/hooks/cart/useDeleteItem.hook';

/**
 * @desc Custom hook `useCartLogic` tổng hợp các logic xử lý giỏ hàng:
 * - Lấy dữ liệu giỏ hàng
 * - Cập nhật số lượng sản phẩm
 * - Xoá sản phẩm
 * - Quản lý trạng thái checked và hiển thị tổng đơn hàng
 *
 * @returns {{
 *   cart: Array,
 *   checkedProducts: Object,
 *   isInitialLoad: boolean,
 *   loading: boolean,
 *   error: any,
 *   shouldShowCartTotal: boolean,
 *   handleDeleteItem: Function,
 *   updateQuantity: Function
 * }}
 */
export const useCartLogic = () => {
    // Lấy state và các hàm điều khiển từ useCartState
    const {
        products: cart,
        checkedProducts,
        updateProducts,
        updateProductQuantity,
        removeProduct,
    } = useCartState();

    // Trạng thái tải lần đầu (dùng để delay hiệu ứng loading nếu cần)
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Hook lấy dữ liệu giỏ hàng từ API
    const {
        fetchCart,
        isLoading: isFetching,
        error: fetchError,
    } = useFetchCart(updateProducts);

    // Hook cập nhật số lượng sản phẩm
    const { updateQuantity, error: updateError } = useUpdateQuantity(
        updateProductQuantity
    );

    // Hook xoá sản phẩm khỏi giỏ
    const { deleteItem, error: deleteError } = useDeleteItem(removeProduct);

    /**
     * Xử lý xoá sản phẩm khỏi giỏ.
     * @param {string} deletedId - ID sản phẩm cần xoá
     */
    const handleDeleteItem = async (deletedId) => {
        try {
            await deleteItem(deletedId);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    // Gọi API lấy dữ liệu giỏ khi component mount
    useEffect(() => {
        fetchCart();

        // Giả lập loading lần đầu
        const timer = setTimeout(() => {
            setIsInitialLoad(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [fetchCart]);

    // Tổng hợp lỗi từ tất cả hook liên quan
    const error = fetchError || updateError || deleteError;

    // Trạng thái đang tải
    const loading = isFetching;

    /**
     * Xác định có nên hiển thị tổng tiền hay không:
     * - Có sản phẩm trong giỏ
     * - Và có ít nhất một sản phẩm đang được chọn
     */
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
