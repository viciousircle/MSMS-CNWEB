import { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { api } from '/utils/api';

const DEFAULT_ORDERS_PER_PAGE = 10;

export const useOrdersLogic = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        ordersPerPage: DEFAULT_ORDERS_PER_PAGE,
    });
    const [filters, setFilters] = useState({
        activeTab: 'all',
        selectedDate: null,
    });
    const [status, setStatus] = useState({
        loading: true,
        error: null,
    });

    const fetchOrders = async () => {
        setStatus({ loading: true, error: null });
        try {
            const data = await api('/seller/orders');
            setOrders(data.orders);
            console.log('Fetched orders:', data.orders);
        } catch (err) {
            setStatus({
                loading: false,
                error: err.message || 'Failed to fetch orders',
            });
            console.error('Error fetching orders:', err);
            return;
        }
        setStatus({ loading: false, error: null });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrder = async (indexOnPage, updatedFields) => {
        const globalIndex =
            (pagination.currentPage - 1) * pagination.ordersPerPage +
            indexOnPage;
        const orderId = orders[globalIndex]._id;

        try {
            const updatedOrder = await api(`/seller/orders/${orderId}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedFields),
            });

            setOrders((prev) => {
                const newOrders = [...prev];
                newOrders[globalIndex] = {
                    ...newOrders[globalIndex],
                    ...updatedOrder,
                };
                return newOrders;
            });
        } catch (err) {
            console.error('Error updating order:', err);
            throw err;
        }
    };

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesTab =
                filters.activeTab === 'all' ||
                order.orderStage.toLowerCase() ===
                    filters.activeTab.toLowerCase();

            const matchesDate =
                !filters.selectedDate ||
                order.dateOrder === format(filters.selectedDate, 'dd-MM-yyyy');

            return matchesTab && matchesDate;
        });
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

    return {
        currentPage: pagination.currentPage,
        ordersPerPage: pagination.ordersPerPage,
        activeTab: filters.activeTab,
        selectedDate: filters.selectedDate,
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
        updateOrder,
        handleItemsPerPageChange,
    };
};
