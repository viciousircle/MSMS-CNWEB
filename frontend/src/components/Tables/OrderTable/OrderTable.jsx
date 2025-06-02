import { React } from 'react';
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

export const OrderTable = ({
    orders,
    onUpdate,
    selectedRows,
    onToggleSelection,
    onToggleAll,
    allSelected,
}) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell className="w-[50px]">
                            <div className="flex items-center justify-center">
                                <Checkbox
                                    className="size-4 bg-white"
                                    checked={allSelected}
                                    onCheckedChange={onToggleAll}
                                />
                            </div>
                        </TableCell>
                        {ORDER_TABLE_COLUMNS.map((column) => (
                            <OrderTableHeaderCell
                                key={column.key}
                                className={`${
                                    column.responsive === 'md-visible'
                                        ? 'hidden md:table-cell'
                                        : ''
                                } ${column.width || ''}`}
                            >
                                {column.header}
                            </OrderTableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order, index) => (
                        <OrderTableRow
                            key={order._id}
                            order={order}
                            index={index}
                            onUpdate={onUpdate}
                            isSelected={selectedRows.has(order._id)}
                            onToggleSelection={() =>
                                onToggleSelection(order._id)
                            }
                        />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={ORDER_TABLE_COLUMNS.length + 1}>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    Total Orders: {orders.length}
                                </span>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};
