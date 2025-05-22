import React from 'react';
import { TableRow } from '@/components/ui/table';
import AccountTableCheckbox from './AccountTableCheckbox';
import AccountTableCells from './AccountTableCells';
import AccountTableActions from './AccountTableActions';

export const AccountTableRow = ({
    account,
    index,
    isSelected,
    onSelect,
    onUpdate,
    onDelete,
}) => {
    return (
        <TableRow>
            <AccountTableCheckbox isSelected={isSelected} onSelect={onSelect} />
            <AccountTableCells account={account} />
            <AccountTableActions
                account={account}
                index={index}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        </TableRow>
    );
};

export default AccountTableRow;
