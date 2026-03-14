import { Search } from 'lucide-react';
import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface UserFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    statusFilter: 'All' | 'Active' | 'Inactive';
    onStatusChange: (status: 'All' | 'Active' | 'Inactive') => void;
}


const UserFilters = ({
    search,
    onSearchChange,
    statusFilter,
    onStatusChange
}: UserFiltersProps) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5"
                />
            </div>
            <div className='flex gap-2'>
                <Button variant={statusFilter === 'All' ? 'default' : 'secondary'}
                    onClick={() => onStatusChange('All')}
                    className="px-4 py-2.5">All Users</Button>
                <Button variant={statusFilter === 'Active' ? 'default' : 'secondary'}
                    onClick={() => onStatusChange('Active')}
                    className="px-4 py-2.5"
                >
                    Active
                </Button>
                <Button variant={statusFilter === 'Inactive' ? 'default' : 'secondary'}
                    onClick={() => onStatusChange('Inactive')}
                    className="px-4 py-2.5"
                >
                    Inactive
                </Button>
            </div>
        </div>
    )
}

export default UserFilters