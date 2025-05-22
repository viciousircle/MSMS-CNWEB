import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { loginUser, googleLogin } from '/utils/api/auth.api';

export const useLogin = () => {
    const { login: authLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (formData) => {
        setError('');
        setLoading(true);

        try {
            const data = await loginUser(formData);
            await authLogin(data.token);
            navigate('/');
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const data = await googleLogin(credentialResponse.credential);
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } catch (error) {
            console.error('Google login error:', error);
            setError(error.message || 'Google authentication failed');
        }
    };

    return { login, handleGoogleLogin, loading, error };
};
