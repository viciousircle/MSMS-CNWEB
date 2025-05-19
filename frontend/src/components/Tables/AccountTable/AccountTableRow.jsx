import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { formatDate } from '/utils/formatDate';
import { RoleBadge, StatusBadge } from '@/components/Others/StatusBadge';
import { toast } from 'sonner';

export const AccountTableRow = ({
    account,
    index,
    isSelected,
    onSelect,
    onUpdate,
    onDelete,
}) => {
    const { _id, username, email, role, status, createdAt } = account;

    const handleStatusChange = async (newStatus) => {
        try {
            await onUpdate(index, { status: newStatus });
            toast.success(
                `Account ${
                    newStatus === 'active' ? 'activated' : 'deactivated'
                } successfully`
            );
        } catch (error) {
            console.error('Failed to update account status:', error);
            toast.error('Failed to update account status');
        }
    };

    const handleRoleChange = async (newRole) => {
        try {
            await onUpdate(index, { role: newRole });
            toast.success(`Account role changed to ${newRole}`);
        } catch (error) {
            console.error('Failed to update account role:', error);
            toast.error('Failed to update account role');
        }
    };

    const handleDelete = async () => {
        try {
            await onDelete(_id);
            toast.success('Account deleted successfully');
        } catch (error) {
            console.error('Failed to delete account:', error);
            toast.error('Failed to delete account');
        }
    };

    return (
        <TableRow>
            <TableCell>
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={onSelect}
                    aria-label="Select row"
                />
            </TableCell>
            <TableCell className="font-medium">{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
                <RoleBadge role={role} />
            </TableCell>
            <TableCell>
                <StatusBadge status={status} />
            </TableCell>
            <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                handleStatusChange(
                                    status === 'active' ? 'inactive' : 'active'
                                )
                            }
                        >
                            {status === 'active' ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                handleRoleChange(
                                    role === 'customer' ? 'seller' : 'customer'
                                )
                            }
                        >
                            Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={handleDelete}
                        >
                            Delete Account
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};
