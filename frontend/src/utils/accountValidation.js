export const validateAccountForm = (formData) => {
    const errors = {};
    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Invalid email format';
    }
    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
};
