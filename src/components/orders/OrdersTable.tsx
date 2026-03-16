import React from 'react'
import type { OrderWithDetails } from '@/types'
import OrderRow from './OrderRow';

interface OrdersTableProps {
    orders: OrderWithDetails[];
    onView: (order: OrderWithDetails) => void;
    onEdit: (order: OrderWithDetails) => void;
    onDelete: (order: OrderWithDetails) => void;
}


const OrdersTable = ({ orders, onView, onEdit, onDelete }: OrdersTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100 dark:border-white/6">
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                            Order ID
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                            Customer
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                            Product
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <OrderRow
                            key={order.id}
                            order={order}
                            onView={onView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersTable