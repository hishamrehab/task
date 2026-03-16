import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import OrdersFilters from '@/components/orders/OrdersFilters';
import OrdersStats from '@/components/orders/OrdersStats'
import OrdersTable from '@/components/orders/OrdersTable';
import { Card } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { getOrders, getOrdersStats } from '@/lib/fakeApi';
import type { OrdersFilter, OrderStats, OrderStatus, OrderWithDetails } from '@/types'
import OrdersPagination from '@/components/orders/OrdersPagination';
import OrderDetailsModal from '@/components/orders/OrderDetailsModal';
import EditOrderModal from '@/components/orders/EditOrderModal';

const PAGE_SIZE = 10;


const OrdersPage = () => {
    const [stats, setStats] = useState<OrderStats | null>(null);
    const [orders, setOrders] = useState<OrderWithDetails[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filteredOrders, setFilteredOrders] = useState<OrderWithDetails[]>([]);

    const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [orderToEdit, setOrderToEdit] = useState<OrderWithDetails | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [filters, setFilters] = useState<OrdersFilter>({
        status: 'All',
        search: '',
        page: 1,
        pageSize: PAGE_SIZE,
    });


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [statsData, ordersData] = await Promise.all([
                    getOrdersStats(),
                    getOrders(),
                ]);
                setStats(statsData);
                setOrders(ordersData);
                setFilteredOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Apply filters 
    useEffect(() => {
        let filtered = orders;

        // Apply status filter
        if (filters.status !== 'All') {
            filtered = filtered.filter(o => o.status === filters.status);
        }

        // Apply search filter
        if (filters.search) {
            const lowerSearch = filters.search.toLowerCase();
            filtered = filtered.filter(
                order =>
                    order.id.toString().includes(lowerSearch) ||
                    order.customerName.toLowerCase().includes(lowerSearch) ||
                    order.product.toLowerCase().includes(lowerSearch)
            );
        }

        setFilteredOrders(filtered);
        setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));

        // Reset to page 1 if current page is out of bounds
        if (filters.page > Math.ceil(filtered.length / PAGE_SIZE) && filtered.length > 0) {
            setFilters(prev => ({ ...prev, page: 1 }));
        }
    }, [filters.status, filters.search, orders]);


    // Get current page of orders
    const paginatedOrders = filteredOrders.slice(
        (filters.page - 1) * PAGE_SIZE,
        filters.page * PAGE_SIZE
    );




    const handleSearchChange = (value: string) => {
        setFilters(prev => ({ ...prev, search: value, page: 1 }));
    };

    const handleStatusChange = (status: OrderStatus | 'All') => {
        setFilters(prev => ({ ...prev, status, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };


    const handleView = (order: OrderWithDetails) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const handleEdit = (order: OrderWithDetails) => {
        setOrderToEdit(order);
        setEditModalOpen(true);
    };

    const handleSaveEdit = (updatedOrder: OrderWithDetails) => {
        setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
        if (selectedOrder?.id === updatedOrder.id) {
            setSelectedOrder(updatedOrder);
        }
    };

    const handleDelete = (order: OrderWithDetails) => {
        const isDark = document.documentElement.classList.contains('dark');

        Swal.fire({
            title: 'Delete Order?',
            text: `Are you sure you want to delete order ORD-${order.id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'rounded-2xl border border-border shadow-xl !font-sans',
                title: 'text-xl font-semibold',
                htmlContainer: 'text-muted-foreground',
                confirmButton: 'inline-flex items-center justify-center h-10 px-6 py-2 text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all rounded-xl mx-2 shadow-sm',
                cancelButton: 'inline-flex items-center justify-center h-10 px-6 py-2 text-sm font-medium border border-border bg-background text-foreground hover:bg-accent transition-all rounded-xl mx-2',
                actions: 'mt-6',
            },
            buttonsStyling: false,
            background: isDark ? '#1c1c1c' : '#ffffff',
            color: isDark ? '#f8fafc' : '#0f172a',
            iconColor: '#f87171',
        }).then((result) => {
            if (result.isConfirmed) {
                setOrders(prev => prev.filter(o => o.id !== order.id));
                if (selectedOrder?.id === order.id) {
                    setModalOpen(false);
                }
                Swal.fire({
                    title: 'Deleted!',
                    text: `Order ORD-${order.id} has been removed.`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'rounded-2xl border border-border shadow-xl !font-sans',
                        title: 'text-xl font-semibold',
                        htmlContainer: 'text-muted-foreground',
                    },
                    buttonsStyling: false,
                    background: isDark ? '#1c1c1c' : '#ffffff',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    iconColor: '#4ade80',
                });
            }
        });
    };

    // Compute counts for filter badges
    const counts = {
        All: orders.length,
        Pending: orders.filter(order => order.status === 'Pending').length,
        Paid: orders.filter(order => order.status === 'Paid').length,
        Shipped: orders.filter(order => order.status === 'Shipped').length,
        Delivered: orders.filter(order => order.status === 'Delivered').length,
        Cancelled: orders.filter(order => order.status === 'Cancelled').length,
    };

    if (loading || !stats) {
        return <LoadingSpinner size="xl" className="mt-20" />;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders Management</h1>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                    Track and manage all customer orders
                </p>
            </div>

            {stats && <OrdersStats stats={stats} />}

            <Card className="overflow-hidden">
                <OrdersFilters
                    search={filters.search}
                    onSearchChange={handleSearchChange}
                    statusFilter={filters.status}
                    onStatusChange={handleStatusChange}
                    counts={counts}
                    totalRevenue={stats?.totalRevenue || 0}
                />

                <OrdersTable
                    orders={paginatedOrders}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {totalPages > 1 && (
                    <OrdersPagination
                        currentPage={filters.page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </Card>

            <OrderDetailsModal
                order={selectedOrder}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />

            <EditOrderModal
                order={orderToEdit}
                open={editModalOpen}
                onOpenChange={setEditModalOpen}
                onSave={handleSaveEdit}
            />

        </div>
    );
}

export default OrdersPage