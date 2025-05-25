import React from 'react';
import { TableRow } from '@/components/ui/table';
import AccountTableCheckbox from './AccountTableCheckbox';
import AccountTableCells from './AccountTableCells';

export const AccountTableRow = ({ account, index, isSelected, onSelect }) => {
    return (
        <TableRow>
            <AccountTableCheckbox isSelected={isSelected} onSelect={onSelect} />
            <AccountTableCells account={account} />
        </TableRow>
    );
};

export default AccountTableRow;
