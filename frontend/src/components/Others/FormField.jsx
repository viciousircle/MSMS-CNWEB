import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FormField = ({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    required,
    extraLabel,
}) => (
    <div className="grid gap-2">
        <div className="flex items-center">
            <Label htmlFor={id}>{label}</Label>
            {extraLabel}
        </div>
        <Input
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
        />
    </div>
);
export default FormField;
