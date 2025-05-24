export const api = async (endpoint, options = {}) => {
    // * For debug purposes only
    console.log('API call:', endpoint, options);

    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const BASE_URL =
            import.meta.env.VITE_API_URL || 'http://localhost:5678';
        const response = await fetch(`${BASE_URL}/api${endpoint}`, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Session expired. Please login again.');
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Request failed');
        }

        return await response.json();
    } catch (error) {
        if (error.message === 'Session expired. Please login again.') {
            throw error;
        }
        throw new Error(error.message || 'Network error occurred');
    }
};
