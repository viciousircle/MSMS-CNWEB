// Validation patterns
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_PATTERN =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const NAME_PATTERN = /^[a-zA-Z\s]{2,50}$/;

// Validation error messages
export const VALIDATION_MESSAGES = {
    NAME_REQUIRED: 'Full name is required',
    NAME_INVALID:
        'Full name should be 2-50 characters long and contain only letters and spaces',
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_INVALID:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
    LOGIN_EMAIL_REQUIRED: 'Email is required',
    LOGIN_EMAIL_INVALID: 'Please enter a valid email address',
    LOGIN_PASSWORD_REQUIRED: 'Password is required',
    LOGIN_INVALID_CREDENTIALS: 'Invalid email or password',
};

export const validateSignUpForm = (formData) => {
    const errors = {};

    // Validate name
    if (!formData.name) {
        errors.name = VALIDATION_MESSAGES.NAME_REQUIRED;
    } else if (!NAME_PATTERN.test(formData.name)) {
        errors.name = VALIDATION_MESSAGES.NAME_INVALID;
    }

    // Validate email
    if (!formData.email) {
        errors.email = VALIDATION_MESSAGES.EMAIL_REQUIRED;
    } else if (!EMAIL_PATTERN.test(formData.email)) {
        errors.email = VALIDATION_MESSAGES.EMAIL_INVALID;
    }

    // Validate password
    if (!formData.password) {
        errors.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    } else if (!PASSWORD_PATTERN.test(formData.password)) {
        errors.password = VALIDATION_MESSAGES.PASSWORD_INVALID;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
        errors.confirmPassword = VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED;
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateLoginForm = (formData) => {
    const errors = {};

    // Validate email
    if (!formData.email) {
        errors.email = VALIDATION_MESSAGES.LOGIN_EMAIL_REQUIRED;
    } else if (!EMAIL_PATTERN.test(formData.email)) {
        errors.email = VALIDATION_MESSAGES.LOGIN_EMAIL_INVALID;
    }

    // Validate password
    if (!formData.password) {
        errors.password = VALIDATION_MESSAGES.LOGIN_PASSWORD_REQUIRED;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
