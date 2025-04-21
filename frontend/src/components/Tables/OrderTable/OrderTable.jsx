import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ORDER_TABLE_COLUMNS } from '@/constants/orderTableConfig';
import { OrderTableRow } from './OrderTableRow';
import { OrderTableHeaderCell } from './OrderTableHeaderCell';
import { useOrderTable } from '@/hooks/seller/useOrderTable.hook';

export const OrderTable = ({ orders }) => {
    const {
        selectedRows,
        totalBill,
        allSelected,
        toggleRowSelection,
        toggleAllRows,
    } = useOrderTable(orders);

    return (
        <Table>
            <TableHeader className="bg-gray-100">
                <TableRow>
                    {ORDER_TABLE_COLUMNS.map(
                        ({ key, width, align, header, isCheckbox }) => (
                            <OrderTableHeaderCell
                                key={key}
                                className={`${width} ${
                                    key === 'details' ? 'pr-4' : ''
                                }`}
                                align={align}
                            >
                                {isCheckbox ? (
                                    <Checkbox
                                        className="size-4 bg-white"
                                        checked={allSelected}
                                        onCheckedChange={toggleAllRows}
                                    />
                                ) : (
                                    header
                                )}
                            </OrderTableHeaderCell>
                        )
                    )}
                </TableRow>
            </TableHeader>

            <TableBody>
                {orders.map((order) => (
                    <OrderTableRow
                        key={order._id}
                        order={order}
                        isSelected={selectedRows.has(order._id)}
                        onToggleSelection={() => toggleRowSelection(order._id)}
                    />
                ))}
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell />
                    <TableCell className="text-center font-medium">
                        Total
                    </TableCell>
                    <TableCell colSpan={3} />
                    <TableCell className="text-center font-medium">
                        ${totalBill}
                    </TableCell>
                    <TableCell colSpan={4} />
                </TableRow>
            </TableFooter>
        </Table>
    );
};
