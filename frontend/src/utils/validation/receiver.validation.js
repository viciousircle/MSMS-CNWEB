// Validation patterns
const PHONE_PATTERN = /^\d+$/; // Only digits allowed
const NAME_PATTERN = /^[a-zA-Z\s]{2,50}$/; // 2-50 characters, letters and spaces only

// Validation error messages
export const VALIDATION_MESSAGES = {
    NAME_REQUIRED: 'Receiver name is required',
    NAME_INVALID:
        'Name should be 2-50 characters long and contain only letters and spaces',
    PHONE_REQUIRED: 'Phone number is required',
    PHONE_INVALID: 'Phone number must contain only digits',
    PHONE_LENGTH: 'Phone number must be exactly 10 digits',
    ADDRESS_NUMBER_REQUIRED: 'House/Street number is required',
    ADDRESS_STREET_REQUIRED: 'Street name is required',
    ADDRESS_WARD_REQUIRED: 'Ward is required',
    ADDRESS_DISTRICT_REQUIRED: 'District is required',
    ADDRESS_PROVINCE_REQUIRED: 'Province is required',
};

export const validateReceiverInfo = (info) => {
    const errors = {};

    // Validate name
    if (!info.name) {
        errors.name = VALIDATION_MESSAGES.NAME_REQUIRED;
    } else if (!NAME_PATTERN.test(info.name)) {
        errors.name = VALIDATION_MESSAGES.NAME_INVALID;
    }

    // Validate phone
    if (!info.phone) {
        errors.phone = VALIDATION_MESSAGES.PHONE_REQUIRED;
    } else if (!PHONE_PATTERN.test(info.phone)) {
        errors.phone = VALIDATION_MESSAGES.PHONE_INVALID;
    } else if (info.phone.length !== 10) {
        errors.phone = VALIDATION_MESSAGES.PHONE_LENGTH;
    }

    // Validate address fields
    if (!info.address.number) {
        errors.address = {
            ...errors.address,
            number: VALIDATION_MESSAGES.ADDRESS_NUMBER_REQUIRED,
        };
    }
    if (!info.address.street) {
        errors.address = {
            ...errors.address,
            street: VALIDATION_MESSAGES.ADDRESS_STREET_REQUIRED,
        };
    }
    if (!info.address.ward) {
        errors.address = {
            ...errors.address,
            ward: VALIDATION_MESSAGES.ADDRESS_WARD_REQUIRED,
        };
    }
    if (!info.address.district) {
        errors.address = {
            ...errors.address,
            district: VALIDATION_MESSAGES.ADDRESS_DISTRICT_REQUIRED,
        };
    }
    if (!info.address.province) {
        errors.address = {
            ...errors.address,
            province: VALIDATION_MESSAGES.ADDRESS_PROVINCE_REQUIRED,
        };
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
