// import { api } from './api';
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
    const response = await fetch('http://localhost:5678/api/users/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Google authentication failed');
    }

    return data;
};
