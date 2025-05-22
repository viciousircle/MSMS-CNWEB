import React from 'react';
import { TableRow } from '@/components/ui/table';
import OrderTableCheckbox from './OrderTableCheckbox';
import OrderTableCells from './OrderTableCells';
import OrderTableActions from './OrderTableActions';

export const OrderTableRow = ({
    order,
    isSelected,
    onToggleSelection,
    onUpdate,
}) => {
    return (
        <TableRow>
            <OrderTableCheckbox
                isSelected={isSelected}
                onToggleSelection={onToggleSelection}
            />
            <OrderTableCells order={order} />
            <OrderTableActions order={order} onStageUpdated={onUpdate} />
        </TableRow>
    );
};

export default OrderTableRow;
