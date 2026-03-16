import type { OrderStatus } from "@/types";
import { DollarSign, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface OrdersFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    statusFilter: OrderStatus | 'All';
    onStatusChange: (status: OrderStatus | 'All') => void;
    counts: Record<OrderStatus | 'All', number>;
    totalRevenue: number;
}

const statuses: (OrderStatus | 'All')[] = ['All', 'Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'];


export const OrdersFilters = ({
    search,
    onSearchChange,
    statusFilter,
    onStatusChange,
    counts,
    totalRevenue,
}: OrdersFiltersProps) => {
    return (
        <div className="p-5 bg-gray-50/40 dark:bg-white/2 border-b border-gray-100 dark:border-white/6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
                    <Input
                        placeholder="Search orders, customers, products..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 pr-4 py-2.5 w-full"
                    />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 rounded-lg">
                    <DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <span className="text-sm font-semibold text-teal-700 dark:text-teal-400">
                        Total: {totalRevenue.toFixed(2)} EGP
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4 overflow-x-auto">
                {statuses.map((status) => (
                    <Button
                        key={status}
                        variant={statusFilter === status ? 'default' : 'secondary'}
                        onClick={() => onStatusChange(status)}
                        className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
                    >
                        {status === 'All' ? 'All' : status}
                        <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-white/20 text-current">
                            {counts[status]}
                        </span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default OrdersFilters;
