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

    addToCart: async (productId, quantity) => {
        try {
            const response = await api('/cart', {
                method: 'POST',
                body: JSON.stringify({ productId, quantity }),
            });
            return response;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    },

    updateCartItem: async (productId, quantity) => {
        try {
            const response = await api(`/cart/${productId}`, {
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
