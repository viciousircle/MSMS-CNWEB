import React from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';

export const PhoneInput = ({ value, onChange }) => (
    <InputOTP
        maxLength={10}
        className="w-full"
        value={value}
        onChange={onChange}
    >
        <InputOTPGroup className="flex-1">
            {[...Array(4)].map((_, i) => (
                <InputOTPSlot key={i} index={i} className="flex-1" />
            ))}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup className="flex-1">
            {[...Array(3)].map((_, i) => (
                <InputOTPSlot key={i + 4} index={i + 4} className="flex-1" />
            ))}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup className="flex-1">
            {[...Array(3)].map((_, i) => (
                <InputOTPSlot key={i + 7} index={i + 7} className="flex-1" />
            ))}
        </InputOTPGroup>
    </InputOTP>
);
