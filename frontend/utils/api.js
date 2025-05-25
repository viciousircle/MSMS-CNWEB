export const api = async (endpoint, options = {}) => {
    // * For debugging purposes
    // console.log('API call details:', {
    //     endpoint,
    //     options,
    //     baseUrl:
    //         import.meta.env.VITE_API_URL || 'https://msms-cnweb.onrender.com',
    //     fullUrl: `${
    //         import.meta.env.VITE_API_URL || 'https://msms-cnweb.onrender.com'
    //     }/api${endpoint}`,
    // });

    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const BASE_URL =
            import.meta.env.VITE_API_URL || 'https://msms-cnweb.onrender.com';

        // * For debugging purposes
        // console.log('Making request with config:', {
        //     url: `${BASE_URL}/api${endpoint}`,
        //     headers,
        //     credentials: 'include',
        //     mode: 'cors',
        // });

        const response = await fetch(`${BASE_URL}/api${endpoint}`, {
            ...options,
            headers,
            credentials: 'include',
            mode: 'cors',
            cache: 'no-cache',
        });

        // * For debugging purposes
        // console.log('Response headers:', {
        //     status: response.status,
        //     statusText: response.statusText,
        //     headers: Object.fromEntries(response.headers.entries()),
        // });

        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Session expired. Please login again.');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData,
            });
            throw new Error(errorData.message || 'Request failed');
        }

        const data = await response.json();

        // * For debugging purposes
        // console.log('API Response:', data);

        return data;
    } catch (error) {
        console.error('API Error Details:', {
            message: error.message,
            stack: error.stack,
            type: error.name,
        });
        if (error.message === 'Session expired. Please login again.') {
            throw error;
        }
        throw new Error(error.message || 'Network error occurred');
    }
};
