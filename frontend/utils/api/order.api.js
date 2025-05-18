import { api } from '/utils/api';

export const orderApi = {
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
