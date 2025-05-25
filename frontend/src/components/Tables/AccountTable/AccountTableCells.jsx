import React from 'react';
import { TableCell } from '@/components/ui/table';
import { RoleBadge } from '@/components/Others/StatusBadge';

const AccountTableCells = ({ account }) => {
    const { name, email, role, createdAt } = account;

    return (
        <>
            <TableCell className="font-medium text-center">{name}</TableCell>
            <TableCell className="text-center">{email}</TableCell>
            <TableCell className="text-center">
                <RoleBadge role={role} />
            </TableCell>
            <TableCell className="text-center">
                {new Date(createdAt).toLocaleString()}
            </TableCell>
        </>
    );
};

export default AccountTableCells;
