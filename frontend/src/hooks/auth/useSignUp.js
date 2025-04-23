import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '/utils/api';

const initialFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const validateForm = (formData) => {
    if (formData.password !== formData.confirmPassword) {
        return "Passwords don't match";
    }
    if (!formData.name || !formData.email || !formData.password) {
        return 'All fields are required';
    }
    return '';
};

export const useSignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm(formData);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            await api('/users', {
                method: 'POST',
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            toast.success('Registration successful! Redirecting to login...', {
                duration: 2000,
                onAutoClose: () => {
                    navigate('/login', {
                        state: { registrationSuccess: true },
                        replace: true,
                    });
                },
            });
        } catch (err) {
            setError(err.message);
            toast.error(err.message || 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        error,
        isSubmitting,
        handleChange,
        handleSubmit,
    };
};
