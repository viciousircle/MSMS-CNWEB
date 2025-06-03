import { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { api } from '/utils/api';

const DEFAULT_ORDERS_PER_PAGE = 10;

// Simple sort options - comment out when not needed
const SORT_OPTIONS = {
    NAME_ASC: { field: 'receiver.name', label: 'Name (A-Z)', direction: 'asc' },
    EMAIL_ASC: {
        field: 'receiver.email',
        label: 'Email (A-Z)',
        direction: 'asc',
    },
    TOTAL_ASC: { field: 'total', label: 'Total (Low-High)', direction: 'asc' },
    DATE_ASC: { field: 'dateOrder', label: 'Date (Old-New)', direction: 'asc' },
    PHONE_ASC: {
        field: 'receiver.phone',
        label: 'Phone (A-Z)',
        direction: 'asc',
    },
};

export const useOrdersLogic = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        ordersPerPage: DEFAULT_ORDERS_PER_PAGE,
    });
    const [filters, setFilters] = useState({
        activeTab: 'all',
        selectedDate: null,
        sortOption: null,
    });
    const [status, setStatus] = useState({
        loading: true,
        error: null,
    });

    const fetchOrders = async () => {
        // console.log('Fetching orders from backend');
        setStatus({ loading: true, error: null });
        try {
            const data = await api('/seller/orders');
            setOrders(data.orders);
        } catch (err) {
            console.error('Error in fetchOrders:', err);
            setStatus({
                loading: false,
                error: err.message || 'Failed to fetch orders',
            });
            return;
        }
        setStatus({ loading: false, error: null });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrder = async (orderId, updatedFields) => {
        console.log('updateOrder called with:', { orderId, updatedFields });
        try {
            // console.log('Sending PUT request to backend');
            const updatedOrder = await api(`/seller/orders/${orderId}`, {
                method: 'PUT',
                body: JSON.stringify(updatedFields),
            });

            // * For debugging purposes
            // console.log('Backend response:', updatedOrder);

            // Update the order in the local state
            setOrders((prev) => {
                console.log('Previous orders state:', prev);
                const newOrders = prev.map((order) => {
                    if (order._id === orderId) {
                        const updated = {
                            ...order,
                            ...updatedOrder,
                            orderStage: updatedFields.stage || order.orderStage,
                        };
                        // console.log('Updated order:', updated);
                        return updated;
                    }
                    return order;
                });
                // console.log('New orders state:', newOrders);
                return newOrders;
            });

            return updatedOrder;
        } catch (err) {
            console.error('Error in updateOrder:', err);
            throw err;
        }
    };

    const filteredOrders = useMemo(() => {
        // First apply filters
        const filtered = orders.filter((order) => {
            const matchesTab =
                filters.activeTab === 'all' ||
                order.orderStage.toLowerCase() ===
                    filters.activeTab.toLowerCase();

            const matchesDate =
                !filters.selectedDate ||
                order.dateOrder === format(filters.selectedDate, 'dd-MM-yyyy');

            return matchesTab && matchesDate;
        });

        // Apply sorting if a sort option is selected
        if (filters.sortOption) {
            const { field, direction } = SORT_OPTIONS[filters.sortOption];
            return [...filtered].sort((a, b) => {
                const getValue = (obj, path) => {
                    return path
                        .split('.')
                        .reduce((acc, part) => acc?.[part], obj);
                };

                const aValue = getValue(a, field);
                const bValue = getValue(b, field);

                // Handle date sorting
                if (field === 'dateOrder') {
                    const aDate = aValue.split('-').reverse().join('');
                    const bDate = bValue.split('-').reverse().join('');
                    return direction === 'asc'
                        ? aDate.localeCompare(bDate)
                        : bDate.localeCompare(aDate);
                }

                // Handle number sorting (for total)
                if (field === 'total') {
                    return direction === 'asc'
                        ? aValue - bValue
                        : bValue - aValue;
                }

                // Handle string sorting (for name, email, phone)
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return direction === 'asc'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                return 0;
            });
        }

        return filtered;
    }, [orders, filters]);

    const totalPages = Math.ceil(
        filteredOrders.length / pagination.ordersPerPage
    );

    const paginatedOrders = useMemo(() => {
        const start = (pagination.currentPage - 1) * pagination.ordersPerPage;
        return filteredOrders.slice(start, start + pagination.ordersPerPage);
    }, [filteredOrders, pagination]);

    const handleItemsPerPageChange = (value) => {
        setPagination({
            ...pagination,
            ordersPerPage: Number(value),
            currentPage: 1,
        });
    };

    const handleSort = (sortOption) => {
        setFilters((prev) => ({
            ...prev,
            sortOption: prev.sortOption === sortOption ? null : sortOption,
        }));
    };

    return {
        currentPage: pagination.currentPage,
        ordersPerPage: pagination.ordersPerPage,
        activeTab: filters.activeTab,
        selectedDate: filters.selectedDate,
        sortOptions: SORT_OPTIONS,
        sortOption: filters.sortOption,
        paginatedOrders,
        totalPages,
        loading: status.loading,
        error: status.error,
        setCurrentPage: (page) =>
            setPagination((prev) => ({ ...prev, currentPage: page })),
        setActiveTab: (tab) =>
            setFilters((prev) => ({ ...prev, activeTab: tab })),
        setSelectedDate: (date) =>
            setFilters((prev) => ({ ...prev, selectedDate: date })),
        handleSort,
        updateOrder,
        handleItemsPerPageChange,
        fetchOrders,
        setOrders,
    };
};
