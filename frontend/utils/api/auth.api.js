import { api } from '/utils/api';

export const loginUser = async (formData) => {
    const data = await api('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!data || !data.token) {
        throw new Error(data?.message || 'Invalid response from server');
    }

    return data;
};

export const googleLogin = async (credential) => {
    const data = await api('/users/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
    });

    if (!data || !data.token) {
        throw new Error(data?.message || 'Google authentication failed');
    }

    return data;
};

export const signupUser = async (userData) => {
    const data = await api('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password,
        }),
    });

    if (!data) {
        throw new Error(data?.message || 'Registration failed');
    }

    return data;
};
