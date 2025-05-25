import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const PaymentMethodSelector = ({
    paymentMethods,
    onValueChange,
    defaultValue,
}) => (
    <Select onValueChange={onValueChange} value={defaultValue}>
        <SelectTrigger className="w-full text-left">
            <SelectValue placeholder="Cash on Delivery" />
        </SelectTrigger>
        <SelectContent>
            {paymentMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                    {method.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);
