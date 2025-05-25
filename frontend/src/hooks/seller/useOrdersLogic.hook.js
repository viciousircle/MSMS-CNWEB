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
        // console.log('Filtering orders with:', { filters, orders });
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
        // console.log('Filtered orders:', filtered);
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
        fetchOrders,
    };
};
