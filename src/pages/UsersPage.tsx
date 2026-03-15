import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import type { UsersFilters, UserWithStats } from '../types';
import { getAllOrders, getUsers } from '../lib/fakeApi';
import { Card } from '../components/ui/card';
import UserFilters from '../components/users/UserFilters';
import UsersTable from '../components/users/UsersTable';
import Pagination from '../components/users/Pagination';
import UserDetailsModal from '../components/users/UserDetailsModal';
import EditUserModal from '../components/users/EditUserModal';

const PAGE_SIZE = 10;


const UsersPage = () => {
    const [filters, setFilters] = useState<UsersFilters>({
        search: '',
        status: 'All',
        sort: 'desc',
        page: 1,
        pageSize: PAGE_SIZE,
    });

    const [users, setUsers] = useState<UserWithStats[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<UserWithStats | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [userToEdit, setUserToEdit] = useState<UserWithStats | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);


    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const [usersResponse, allOrders] = await Promise.all([
                    getUsers(filters),
                    getAllOrders(),
                ]);


                const usersWithStats: UserWithStats[] = usersResponse.users.map((user) => {
                    const userOrders = allOrders.filter((order) => order.userId === user.id);
                    const ordersCount = userOrders.length;
                    const totalSpent = userOrders.reduce((sum, order) => sum + order.amount, 0);
                    const role = ordersCount > 20 ? 'Premium' : 'Standard';
                    return {
                        ...user,
                        ordersCount,
                        totalSpent,
                        role,
                    };
                });
                setUsers(usersWithStats);
                setTotalPages(usersResponse.totalPages);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [filters]);

    const handleSearchChange = (search: string) => {
        setFilters((prev) => ({ ...prev, search, page: 1 }));
    };

    const handleStatusChange = (status: 'All' | 'Active' | 'Inactive') => {
        setFilters((prev) => ({ ...prev, status, page: 1 }));
    };


    const handleView = (user: UserWithStats) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleEdit = (user: UserWithStats) => {
        setUserToEdit(user);
        setEditModalOpen(true);
    };

    const handleSaveEdit = (updatedUser: UserWithStats) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                (user.id === updatedUser.id ? updatedUser : user)))

        if (selectedUser?.id === updatedUser.id) {
            setSelectedUser(updatedUser);
        }
    };

    const handleDelete = (user: UserWithStats) => {
        const isDark = document.documentElement.classList.contains('dark');
        
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${user.name}. This action cannot be undone.`,
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
                setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
                if (selectedUser?.id === user.id) {
                    setModalOpen(false);
                }
                Swal.fire({
                    title: 'Deleted!',
                    text: `${user.name} has been removed.`,
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

    return (
        <div className='space-y-6'>
            <Card className="p-6">
                <UserFilters
                    search={filters.search}
                    onSearchChange={handleSearchChange}
                    statusFilter={filters.status}
                    onStatusChange={handleStatusChange}
                />

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        <UsersTable
                            users={users}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={filters.page}
                                totalPages={totalPages}
                                onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
                            />
                        )}
                    </div>
                )}
            </Card>

            <UserDetailsModal
                user={selectedUser}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />

            <EditUserModal
                user={userToEdit}
                open={editModalOpen}
                onOpenChange={setEditModalOpen}
                onSave={handleSaveEdit}
            />
        </div >
    )
}

export default UsersPage