import React from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const ORDERS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];

export const ItemsPerPageSelector = ({ value, onChange }) => (
    <Select value={value.toString()} onValueChange={onChange}>
        <SelectTrigger className="px-4 py-1 border rounded-sm">
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            {ORDERS_PER_PAGE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                    {option}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);
