import { useMemo, useState } from 'react';

export const useOrderTable = (orders) => {
    const [selectedRows, setSelectedRows] = useState(new Set());

    const totalBill = useMemo(() => {
        return orders
            .reduce((sum, { totalBill }) => sum + parseFloat(totalBill), 0)
            .toFixed(2);
    }, [orders]);

    const toggleRowSelection = (orderId) => {
        setSelectedRows((prev) => {
            const newSelection = new Set(prev);
            newSelection.has(orderId)
                ? newSelection.delete(orderId)
                : newSelection.add(orderId);
            return newSelection;
        });
    };

    const toggleAllRows = () => {
        setSelectedRows((prev) =>
            prev.size === orders.length
                ? new Set()
                : new Set(orders.map(({ _id }) => _id))
        );
    };

    const allSelected =
        selectedRows.size === orders.length && orders.length > 0;

    return {
        selectedRows,
        totalBill,
        toggleRowSelection,
        toggleAllRows,
        allSelected,
    };
};
