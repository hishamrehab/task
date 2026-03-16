import type { OrderWithDetails } from '@/types'
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';


interface OrderRowProps {
    order: OrderWithDetails;
    onView: (order: OrderWithDetails) => void;
    onEdit: (order: OrderWithDetails) => void;
    onDelete: (order: OrderWithDetails) => void;
}

const statusConfig: Record<string, { bg: string; text: string; icon: string }> = {
    Delivered: {
        bg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
        text: 'Delivered',
        icon: 'ri-checkbox-circle-line',
    },
    Shipped: {
        bg: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
        text: 'Shipped',
        icon: 'ri-truck-line',
    },
    Pending: {
        bg: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
        text: 'Processing',
        icon: 'ri-time-line',
    },
    Paid: {
        bg: 'bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-500/20',
        text: 'Paid',
        icon: 'ri-money-dollar-circle-line',
    },
    Cancelled: {
        bg: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20',
        text: 'Cancelled',
        icon: 'ri-close-circle-line',
    },
};

export const OrderRow = ({ order, onView, onEdit, onDelete }: OrderRowProps) => {
    const config = statusConfig[order.status] || statusConfig.Pending;


    return (
        <tr className="border-b border-gray-50 dark:border-white/4 hover:bg-teal-50/20 dark:hover:bg-white/3 transition-colors cursor-pointer">
            <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/8 text-xs font-mono font-medium text-gray-700 dark:text-slate-300">
                    ORD-{order.id}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-500/10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-teal-700 dark:text-teal-400">
                            {order.customerInitials}
                        </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-200">
                        {order.customerName}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="text-sm text-gray-600 dark:text-slate-400">{order.product}</span>
            </td>
            <td className="px-6 py-4">
                <span className="text-sm text-gray-600 dark:text-slate-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                </span>
            </td>
            <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-900 dark:text-slate-200">
                    {order.amount.toFixed(2)} {order.currency}
                </span>
            </td>
            <td className="px-6 py-4">
                <Badge variant="outline" className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg}`}>
                    <i className={config.icon}></i>
                    {config.text}
                </Badge>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            onView(order);
                        }}
                        className="p-2 hover:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg h-8 w-8"
                        title="View Details"
                    >
                        <Eye className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(order);
                        }}
                        className="p-2 hover:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg h-8 w-8"
                        title="Edit Order"
                    >
                        <Edit className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(order);
                        }}
                        className="p-2 hover:bg-destructive/10 text-destructive rounded-lg h-8 w-8"
                        title="Delete Order"
                    >
                        <Trash2 className="w-5 h-5" />
                    </Button>
                </div>
            </td>
        </tr>
    )
}


export default OrderRow