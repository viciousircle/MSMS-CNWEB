import React from 'react';
import { TableHead } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

export const AccountTableHeaderCell = ({
    column,
    allSelected,
    onSelectAll,
}) => {
    if (column.id === 'select') {
        return (
            <TableHead style={{ width: column.width }} className="text-center">
                <div className="flex justify-center">
                    <Checkbox
                        checked={allSelected}
                        onCheckedChange={onSelectAll}
                        aria-label="Select all"
                    />
                </div>
            </TableHead>
        );
    }

    return (
        <TableHead style={{ width: column.width }} className="text-center">
            {column.label}
        </TableHead>
    );
};
