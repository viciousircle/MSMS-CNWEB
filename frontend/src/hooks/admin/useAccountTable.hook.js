import { useState } from 'react';

export const useAccountTable = (accounts) => {
    const [selectedRows, setSelectedRows] = useState(new Set());

    const toggleRowSelection = (accountId) => {
        setSelectedRows((prev) => {
            const newSelection = new Set(prev);
            newSelection.has(accountId)
                ? newSelection.delete(accountId)
                : newSelection.add(accountId);
            return newSelection;
        });
    };

    const toggleAllRows = () => {
        setSelectedRows((prev) =>
            prev.size === accounts.length
                ? new Set()
                : new Set(accounts.map(({ _id }) => _id))
        );
    };

    const allSelected =
        selectedRows.size === accounts.length && accounts.length > 0;

    return {
        selectedRows,
        toggleRowSelection,
        toggleAllRows,
        allSelected,
    };
};
