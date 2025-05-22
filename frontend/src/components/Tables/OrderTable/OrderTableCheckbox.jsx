import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

const OrderTableCheckbox = ({ isSelected, onToggleSelection }) => (
    <TableCell>
        <div className="flex items-center justify-center">
            <Checkbox
                className="size-4 bg-white"
                checked={isSelected}
                onCheckedChange={onToggleSelection}
            />
        </div>
    </TableCell>
);

export default OrderTableCheckbox;
