// src/hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '/utils/api';
export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (formData) => {
        setError('');
        setLoading(true);

        try {
            const data = await api('/users/login', {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            localStorage.setItem('customer', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};
