import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

const AccountTableCheckbox = ({ isSelected, onSelect }) => (
    <TableCell>
        <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            aria-label="Select row"
        />
    </TableCell>
);

export default AccountTableCheckbox;
