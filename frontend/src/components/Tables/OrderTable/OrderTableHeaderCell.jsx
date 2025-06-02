import React from 'react';
import { TableHead } from '@/components/ui/table';

export const OrderTableHeaderCell = ({
    children,
    className = '',
    align = 'center',
    responsive = 'always-visible',
}) => {
    const getResponsiveClass = () => {
        switch (responsive) {
            case 'always-visible':
                return '';
            case 'lg-visible':
                return 'hidden lg:table-cell';
            case 'md-visible':
                return 'hidden md:table-cell';
            default:
                return '';
        }
    };

    return (
        <TableHead
            className={`text-${align} ${getResponsiveClass()} ${className}`}
        >
            {children}
        </TableHead>
    );
};
