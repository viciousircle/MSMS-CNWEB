import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { loginUser, googleLogin } from '/utils/api/auth.api';
import { validateLoginForm } from '@/utils/validation/auth.validation';
import { toast } from 'sonner';

const initialFormData = {
    email: '',
    password: '',
};

const initialErrors = {
    email: '',
    password: '',
};

export const useLogin = () => {
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [loading, setLoading] = useState(false);

    // Restore error state from location state if it exists
    useEffect(() => {
        if (location.state?.error) {
            setErrors((prev) => ({
                ...prev,
                email: location.state.error,
            }));
            // Clear the error from location state
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        // Clear error for the field being changed
        setErrors((prev) => ({ ...prev, [id]: '' }));
    };

    const validateField = (fieldName, value) => {
        const validation = validateLoginForm({
            ...formData,
            [fieldName]: value,
        });
        return validation.errors[fieldName] || '';
    };

    const handleBlur = (e) => {
        const { id, value } = e.target;
        const fieldError = validateField(id, value);
        setErrors((prev) => ({ ...prev, [id]: fieldError }));
    };

    const login = async (e) => {
        e.preventDefault();

        const validation = validateLoginForm(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            const firstError = Object.values(validation.errors)[0];
            toast.error(firstError);
            return;
        }

        setLoading(true);
        setErrors(initialErrors);

        try {
            const data = await loginUser(formData);
            await authLogin(data.token);
            navigate('/');
        } catch (err) {
            // Clear only the password field
            setFormData((prev) => ({
                ...prev,
                password: '',
            }));
            // Set error message
            setErrors((prev) => ({
                ...prev,
                password: 'Invalid email or password',
            }));
            toast.error('Invalid email or password');
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
            toast.error(error.message || 'Google authentication failed');
        }
    };

    return {
        formData,
        errors,
        loading,
        handleChange,
        handleBlur,
        login,
        handleGoogleLogin,
    };
};
