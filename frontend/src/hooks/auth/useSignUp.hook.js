import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { signupUser } from '/utils/api/auth.api';
import { validateSignUpForm } from '@/utils/validation/auth.validation';

const initialFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const initialErrors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export const useSignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        // Clear error for the field being changed
        setErrors((prev) => ({ ...prev, [id]: '' }));
    };

    const validateField = (fieldName, value) => {
        const validation = validateSignUpForm({
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validateSignUpForm(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            // Show the first error message in a toast
            const firstError = Object.values(validation.errors)[0];
            toast.error(firstError);
            return;
        }

        setIsSubmitting(true);

        try {
            await signupUser(formData);
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
            const errorMessage = err.message || 'Registration failed';
            toast.error(errorMessage);
            // If the error is related to a specific field, set it in the errors state
            if (err.field) {
                setErrors((prev) => ({ ...prev, [err.field]: errorMessage }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};
