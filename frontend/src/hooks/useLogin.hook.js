import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '/utils/api';
import { useAuth } from '@/contexts/AuthContext';

export const useLogin = () => {
    const { login: authLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (formData) => {
        setError('');
        setLoading(true);

        try {
            // Assuming your api() function already returns parsed JSON
            const data = await api('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!data || !data.token) {
                throw new Error(
                    data?.message || 'Invalid response from server'
                );
            }

            // Use the auth context login
            await authLogin(data.token);

            // Redirect based on role (handled in AuthContext)
            navigate('/');
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};
