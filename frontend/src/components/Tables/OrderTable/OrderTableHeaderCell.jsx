import React from 'react';
import { TableHead } from '@/components/ui/table';

export const OrderTableHeaderCell = ({
    children,
    className = '',
    align = 'center',
}) => (
    <TableHead className={`text-${align} ${className}`}>{children}</TableHead>
);
