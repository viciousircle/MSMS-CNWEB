import React from 'react';
import { TableCell } from '@/components/ui/table';
import { RoleBadge } from '@/components/Others/StatusBadge';

const AccountTableCells = ({ account }) => {
    const { name, email, role, createdAt } = account;

    return (
        <>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
                <RoleBadge role={role} />
            </TableCell>
            <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
        </>
    );
};

export default AccountTableCells;
