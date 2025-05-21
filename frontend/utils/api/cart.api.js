import { api } from '/utils/api';

export const cartApi = {
    getCart: async () => {
        try {
            const response = await api('/cart', {
                method: 'GET',
            });
            return response;
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },

    addToCart: async (productId, selectedColor, quantity) => {
        try {
            const response = api('/cart', {
                method: 'POST',
                body: JSON.stringify({
                    productId: productId,
                    color: selectedColor,
                    quantity,
                    dateAdded: new Date(),
                }),
            });
            return response;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    },

    updateCartItem: async (itemId, quantity) => {
        try {
            const response = await api(`/cart/${itemId}`, {
                method: 'PUT',
                body: JSON.stringify({ quantity }),
            });
            return response;
        } catch (error) {
            console.error('Error updating cart item:', error);
            throw error;
        }
    },

    removeFromCart: async (productId) => {
        try {
            const response = await api(`/cart/${productId}`, {
                method: 'DELETE',
            });
            return response;
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    },
};
