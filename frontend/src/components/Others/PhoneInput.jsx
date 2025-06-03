import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const PhoneInput = ({
    value,
    onChange,
    className,
    required,
    ...props
}) => {
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const inputValue = e.target.value;
        // Only allow digits
        const numericValue = inputValue.replace(/\D/g, '');

        // If first digit is not 0, don't allow the change
        if (numericValue.length > 0 && numericValue[0] !== '0') {
            setError('Phone number must start with 0');
            return;
        }

        // Limit to 10 digits
        const truncatedValue = numericValue.slice(0, 10);

        // Validate length and format
        if (truncatedValue.length > 0) {
            if (truncatedValue[0] !== '0') {
                setError('Phone number must start with 0');
            } else if (truncatedValue.length !== 10) {
                setError('Phone number must be exactly 10 digits');
            } else {
                setError('');
            }
        } else {
            setError('');
        }

        // Call the original onChange with the processed value
        onChange(truncatedValue);
    };

    const handleBlur = (e) => {
        if (required && !value) {
            setError('Phone number is required');
        } else if (value) {
            if (value[0] !== '0') {
                setError('Phone number must start with 0');
            } else if (value.length !== 10) {
                setError('Phone number must be exactly 10 digits');
            } else {
                setError('');
            }
        } else {
            setError('');
        }
    };

    return (
        <div className="w-full">
            <Input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cn(
                    'w-full',
                    error && 'border-red-500 focus-visible:ring-red-500',
                    className
                )}
                required={required}
                placeholder="0XXXXXXXXX"
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};
