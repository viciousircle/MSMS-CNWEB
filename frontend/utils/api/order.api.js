import { api } from '/utils/api';

export const orderApi = {
    createOrder: async (orderData) => {
        try {
            const response = await api('/orders/', {
                method: 'POST',
                body: JSON.stringify(orderData),
            });
            return response;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    getOrder: async (orderId) => {
        try {
            const response = await api(`/orders/${orderId}`, {
                method: 'GET',
            });
            return response;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    },

    getOrders: async () => {
        try {
            const response = await api('/orders', {
                method: 'GET',
            });
            return response;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    cancelOrder: async (orderId) => {
        try {
            const response = await api(`/orders/${orderId}/cancel`, {
                method: 'PUT',
            });
            return response;
        } catch (error) {
            console.error('Error canceling order:', error);
            throw error;
        }
    },
};
