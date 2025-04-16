// src/lib/utils/api.js
export const api = async (endpoint, options = {}) => {
    const baseUrl = 'http://localhost:5678/api';

    const customer = JSON.parse(localStorage.getItem('customer'));
    const token = customer?.token;

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers || {}),
    };

    const res = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};
