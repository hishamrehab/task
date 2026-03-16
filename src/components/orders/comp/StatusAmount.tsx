import type { OrderStatus } from '@/types';

interface StatusAmountProps {
    status: OrderStatus;
    amount: number;
    currency: string;
}

const statusStyles: Record<string, string> = {
    Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    Shipped: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
    Paid: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20',
    Cancelled: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
};

const statusIcons: Record<string, string> = {
    Delivered: 'ri-checkbox-circle-line',
    Shipped: 'ri-truck-line',
    Pending: 'ri-time-line',
    Paid: 'ri-money-dollar-circle-line',
    Cancelled: 'ri-close-circle-line',
};

export const StatusAmount = ({ status, amount, currency }: StatusAmountProps) => {
    return (
        <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${statusStyles[status]}`}>
                <i className={statusIcons[status]}></i>
                {status}
            </span>
            <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-slate-400">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
                </p>
            </div>
        </div>
    );
};

export default StatusAmount;