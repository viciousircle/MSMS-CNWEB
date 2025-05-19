import { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { api } from '/utils/api';

const DEFAULT_ACCOUNTS_PER_PAGE = 10;

export const useAccountsLogic = () => {
    const [accounts, setAccounts] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        accountsPerPage: DEFAULT_ACCOUNTS_PER_PAGE,
    });
    const [filters, setFilters] = useState({
        activeTab: 'all',
        selectedDate: null,
    });
    const [status, setStatus] = useState({
        loading: true,
        error: null,
    });

    const fetchAccounts = async () => {
        setStatus({ loading: true, error: null });
        try {
            const data = await api('/admin/users');
            setAccounts(data);
        } catch (err) {
            setStatus({
                loading: false,
                error: err.message || 'Failed to fetch accounts',
            });
            console.error('Error fetching accounts:', err);
            return;
        }
        setStatus({ loading: false, error: null });
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const updateAccount = async (indexOnPage, updatedFields) => {
        const globalIndex =
            (pagination.currentPage - 1) * pagination.accountsPerPage +
            indexOnPage;
        const accountId = accounts[globalIndex]._id;

        try {
            let endpoint = '';
            let method = 'PUT';
            let body = {};

            if ('status' in updatedFields) {
                endpoint = `/admin/users/${accountId}/status`;
                body = { status: updatedFields.status };
            } else if ('role' in updatedFields) {
                endpoint = `/admin/users/${accountId}/role`;
                body = { role: updatedFields.role };
            }

            const updatedAccount = await api(endpoint, {
                method,
                body: JSON.stringify(body),
            });

            setAccounts((prev) => {
                const newAccounts = [...prev];
                newAccounts[globalIndex] = {
                    ...newAccounts[globalIndex],
                    ...updatedAccount.user,
                };
                return newAccounts;
            });
        } catch (err) {
            console.error('Error updating account:', err);
            throw err;
        }
    };

    const deleteAccount = async (accountId) => {
        try {
            await api(`/admin/users/${accountId}`, {
                method: 'DELETE',
            });

            setAccounts((prev) =>
                prev.filter((account) => account._id !== accountId)
            );
        } catch (err) {
            console.error('Error deleting account:', err);
            throw err;
        }
    };

    const filteredAccounts = useMemo(() => {
        return accounts.filter((account) => {
            const matchesTab =
                filters.activeTab === 'all' ||
                account.role === filters.activeTab ||
                (filters.activeTab === 'inactive' &&
                    account.status === 'inactive');

            const matchesDate =
                !filters.selectedDate ||
                new Date(account.createdAt).toLocaleDateString() ===
                    filters.selectedDate.toLocaleDateString();

            return matchesTab && matchesDate;
        });
    }, [accounts, filters]);

    const totalPages = Math.ceil(
        filteredAccounts.length / pagination.accountsPerPage
    );

    const paginatedAccounts = useMemo(() => {
        const start = (pagination.currentPage - 1) * pagination.accountsPerPage;
        return filteredAccounts.slice(
            start,
            start + pagination.accountsPerPage
        );
    }, [filteredAccounts, pagination]);

    const handleItemsPerPageChange = (value) => {
        setPagination({
            ...pagination,
            accountsPerPage: Number(value),
            currentPage: 1,
        });
    };

    return {
        currentPage: pagination.currentPage,
        accountsPerPage: pagination.accountsPerPage,
        activeTab: filters.activeTab,
        selectedDate: filters.selectedDate,
        paginatedAccounts,
        totalPages,
        loading: status.loading,
        error: status.error,
        setCurrentPage: (page) =>
            setPagination((prev) => ({ ...prev, currentPage: page })),
        setActiveTab: (tab) =>
            setFilters((prev) => ({ ...prev, activeTab: tab })),
        setSelectedDate: (date) =>
            setFilters((prev) => ({ ...prev, selectedDate: date })),
        updateAccount,
        deleteAccount,
        handleItemsPerPageChange,
    };
};
