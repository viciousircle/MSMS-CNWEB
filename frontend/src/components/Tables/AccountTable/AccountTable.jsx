import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { AccountTableRow } from './AccountTableRow';
import { AccountTableHeaderCell } from './AccountTableHeaderCell';
import { useAccountTable } from '@/hooks/admin/useAccountTable.hook';

const ACCOUNT_TABLE_COLUMNS = [
    { id: 'select', label: '', width: '40px' },
    { id: 'username', label: 'Username', width: '200px' },
    { id: 'email', label: 'Email', width: '250px' },
    { id: 'role', label: 'Role', width: '120px' },
    { id: 'createdAt', label: 'Created At', width: '150px' },
    { id: 'actions', label: 'Actions', width: '120px' },
];

export const AccountTable = ({ accounts, onUpdate, onDelete }) => {
    const { selectedRows, allSelected, toggleRowSelection, toggleAllRows } =
        useAccountTable(accounts);

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {ACCOUNT_TABLE_COLUMNS.map((column) => (
                            <AccountTableHeaderCell
                                key={column.id}
                                column={column}
                                allSelected={allSelected}
                                onSelectAll={toggleAllRows}
                            />
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {accounts.map((account, index) => (
                        <AccountTableRow
                            key={account._id}
                            account={account}
                            index={index}
                            isSelected={selectedRows.has(account._id)}
                            onSelect={() => toggleRowSelection(account._id)}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
