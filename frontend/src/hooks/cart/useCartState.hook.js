import { useState, useMemo, useCallback } from 'react';

/**
 * @desc: Khởi tạo trạng thái checked cho các sản phẩm dựa vào tồn kho.
 * @param {Array} products - Danh sách sản phẩm ban đầu.
 * @returns {Object} - Đối tượng chứa trạng thái checked cho từng sản phẩm (theo _id).
 */
const initializeCheckedProducts = (products) =>
    products.reduce(
        (acc, { _id, stock }) => ({
            ...acc,
            [_id]: stock > 0, // Chỉ check sản phẩm có tồn kho
        }),
        {}
    );

/**
 * @desc Custom hook quản lý trạng thái giỏ hàng.
 * @param {Array} initialProducts - Danh sách sản phẩm khởi tạo.
 * @returns {{
 *   products: Array,
 *   checkedProducts: Object,
 *   allChecked: boolean,
 *   updateProducts: Function,
 *   updateProductQuantity: Function,
 *   removeProduct: Function,
 *   handleProductCheck: Function,
 *   handleCheckAll: Function
 * }}
 */
export const useCartState = (initialProducts = []) => {
    const [cartState, setCartState] = useState({
        products: initialProducts,
        checkedProducts: initializeCheckedProducts(initialProducts),
    });

    /**
     * Kiểm tra xem tất cả sản phẩm trong giỏ có đang được chọn không.
     * Chỉ áp dụng với sản phẩm còn hàng (stock > 0).
     */
    const allChecked = useMemo(
        () =>
            cartState.products.length > 0 &&
            cartState.products.every(
                ({ _id, stock }) => stock > 0 && cartState.checkedProducts[_id]
            ),
        [cartState.products, cartState.checkedProducts]
    );

    /**
     * Cập nhật lại danh sách sản phẩm trong giỏ và trạng thái checked tương ứng.
     * @param {Array} newProducts - Danh sách sản phẩm mới.
     */
    const updateProducts = useCallback((newProducts) => {
        setCartState((prev) => {
            const newCheckedProducts = newProducts.reduce(
                (acc, { _id, stock }) => ({
                    ...acc,
                    [_id]:
                        prev.checkedProducts[_id] !== undefined
                            ? prev.checkedProducts[_id]
                            : stock > 0,
                }),
                {}
            );

            return {
                products: newProducts,
                checkedProducts: newCheckedProducts,
            };
        });
    }, []);

    /**
     * @desc Cập nhật số lượng của một sản phẩm trong giỏ.
     * @param {string} id - ID của sản phẩm.
     * @param {number} newQuantity - Số lượng mới.
     */
    const updateProductQuantity = useCallback((id, newQuantity) => {
        setCartState((prev) => ({
            ...prev,
            products: prev.products.map((item) =>
                item._id === id ? { ...item, quantity: newQuantity } : item
            ),
        }));
    }, []);

    /**
     * @desc Xoá một sản phẩm khỏi giỏ hàng.
     * @param {string} id - ID của sản phẩm cần xoá.
     */
    const removeProduct = useCallback((id) => {
        setCartState((prev) => {
            const newChecked = { ...prev.checkedProducts };
            delete newChecked[id];

            return {
                ...prev,
                products: prev.products.filter((item) => item._id !== id),
                checkedProducts: newChecked,
            };
        });
    }, []);

    /**
     * @desc Thay đổi trạng thái checked của một sản phẩm.
     * @param {string} id - ID sản phẩm.
     * @param {boolean} checked - Trạng thái mới.
     */
    const handleProductCheck = useCallback((id, checked) => {
        setCartState((prev) => ({
            ...prev,
            checkedProducts: { ...prev.checkedProducts, [id]: checked },
        }));
    }, []);

    /**
     * @desc Thay đổi trạng thái checked của tất cả sản phẩm còn hàng.
     * @param {boolean} checked - Trạng thái muốn áp dụng (true/false).
     */
    const handleCheckAll = useCallback((checked) => {
        setCartState((prev) => ({
            ...prev,
            checkedProducts: prev.products.reduce(
                (acc, { _id, stock }) => ({
                    ...acc,
                    [_id]: stock > 0 ? checked : acc[_id],
                }),
                {}
            ),
        }));
    }, []);

    return {
        products: cartState.products,
        checkedProducts: cartState.checkedProducts,
        allChecked,
        updateProducts,
        updateProductQuantity,
        removeProduct,
        handleProductCheck,
        handleCheckAll,
    };
};
