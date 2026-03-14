import React, { useEffect, useState } from 'react'
import type { UsersFilters, UserWithStats } from '../types';
import { getAllOrders, getUsers } from '../lib/fakeApi';
import { Card } from '../components/ui/card';
import UserFilters from '../components/users/UserFilters';
import UsersTable from '../components/users/UsersTable';
import Pagination from '../components/users/Pagination';

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
        console.log('View user', user);
    };

    const handleEdit = (user: UserWithStats) => {
        console.log('Edit user', user);
    };

    const handleDelete = (user: UserWithStats) => {
        console.log('Delete user', user);
    };

    return (
        <div className='space-y-6'>
            <Card className="bg-white rounded-xl p-6 border border-gray-200">
                <UserFilters
                    search={filters.search}
                    onSearchChange={handleSearchChange}
                    statusFilter={filters.status}
                    onStatusChange={handleStatusChange}
                />

                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                    </div>
                ) : (
                    <>
                        <UsersTable
                            users={users}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                        {/* {totalPages > 1 && (
                            <div className="flex justify-center mt-6">
                                <Pagination
                                    currentPage={filters.page}
                                    totalPages={totalPages}
                                    onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
                                />
                            </div>
                        )} */}

                    </>
                )}

            </Card >
        </div >
    )
}

export default UsersPage