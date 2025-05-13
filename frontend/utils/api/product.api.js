import { api } from '/utils/api';

export const productApi = {
    getAllProducts: async () => {
        try {
            const response = await api('/products', {
                method: 'GET',
            });
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
};
