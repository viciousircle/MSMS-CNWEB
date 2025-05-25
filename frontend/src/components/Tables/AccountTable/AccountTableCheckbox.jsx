import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

const AccountTableCheckbox = ({ isSelected, onSelect }) => (
    <TableCell className="text-center">
        <div className="flex justify-center">
            <Checkbox
                checked={isSelected}
                onCheckedChange={onSelect}
                aria-label="Select row"
            />
        </div>
    </TableCell>
);

export default AccountTableCheckbox;
