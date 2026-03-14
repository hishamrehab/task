import React from 'react'
import type { UserWithStats } from '../../types';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import UserRow from './UserRow';


interface UsersTableProps {
    users: UserWithStats[];
    onView: (user: UserWithStats) => void;
    onEdit: (user: UserWithStats) => void;
    onDelete: (user: UserWithStats) => void;
}

const UsersTable = ({ users, onView, onEdit, onDelete }: UsersTableProps) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">User</TableHead>
                        <TableHead className="text-left">Role</TableHead>
                        <TableHead className="text-left">Status</TableHead>
                        <TableHead className="text-right">Orders</TableHead>
                        <TableHead className="text-right">Total Spent</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            onView={onView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </TableBody>

            </Table>
        </div>
    )
}

export default UsersTable