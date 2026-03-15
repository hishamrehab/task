import { useEffect, useState } from 'react'
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
            </Card >
            <UserDetailsModal
                user={selectedUser}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div >
    )
}

export default UsersPage