import type { OrderStats } from '@/types'
import { ShoppingBag, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { Card } from '../ui/card';


interface OrdersStatsProps {
    stats: OrderStats;
}
type StatColor = 'teal' | 'amber' | 'emerald' | 'red';

interface ColorClasses {
    teal: string;
    amber: string;
    emerald: string;
    red: string;

}

interface StatCardConfig {
    key: keyof OrderStats;
    label: string;
    icon: any;
    color: StatColor;
}

const statCards: StatCardConfig[] = [
    { key: 'totalOrders', label: 'Total Orders', icon: ShoppingBag, color: 'teal' },
    { key: 'processing', label: 'Processing', icon: Clock, color: 'amber' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'emerald' },
    { key: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'red' },
];

const colorClasses: ColorClasses = {
    teal: 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400',
    amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    red: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
};


const OrdersStats = ({ stats }: OrdersStatsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statCards.map(({ key, label, icon: Icon, color }) => (
                <Card key={key} className="p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">{label}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                {key === 'totalOrders' ? stats.totalOrders : stats[key]}
                            </p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
                            <Icon className="w-6 h-6" />
                        </div>
                    </div>
                </Card>
            ))}

        </div>
    )
}

export default OrdersStats