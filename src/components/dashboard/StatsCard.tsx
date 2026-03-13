
import { Users, UserCheck, ShoppingBag, CircleDollarSign } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface StatsCardProps {
    title: string;
    value: number | string;
    growth: number;
    icon: 'Users' | 'UserCheck' | 'ShoppingBag' | 'CircleDollarSign';
    color: 'violet' | 'teal' | 'orange' | 'emerald';
    strokeColor: string;
}

const iconMap = {
    Users,
    UserCheck,
    ShoppingBag,
    CircleDollarSign,
};

const colorMap = {
    violet: 'border-violet-500/20',
    teal: 'border-teal-500/20',
    orange: 'border-orange-500/20',
    emerald: 'border-emerald-500/20',
};

const bgColorMap = {
    violet: 'bg-violet-500/15',
    teal: 'bg-teal-500/15',
    orange: 'bg-orange-500/15',
    emerald: 'bg-emerald-500/15',
};

const textColorMap = {
    violet: 'text-violet-400',
    teal: 'text-teal-400',
    orange: 'text-orange-400',
    emerald: 'text-emerald-400',
};

const StatsCard = ({ title, value, growth, icon, color, strokeColor }: StatsCardProps) => {
    const Icon = iconMap[icon];

    return (
        <Card
            className={`rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden relative border ${colorMap[color]} shadow-sm`}
        >
            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div
                        className={`w-10 h-10 rounded-xl ${bgColorMap[color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                        <Icon className={`w-5 h-5 ${textColorMap[color]}`} />
                    </div>
                    <Badge variant="default" className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        +{growth}%
                    </Badge>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-0.5 tracking-tight">
                    {value}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">{title}</p>
                <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400 dark:text-slate-500">vs last month</span>
                    <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
                        <polyline
                            points="0,32 7.27,24 14.55,29.33 21.82,16 29.09,21.33 36.36,8 43.64,13.33 50.91,5.33 58.18,10.67 65.45,2.67 72.73,6.4 80,0"
                            stroke={strokeColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </svg>
                </div>
            </div>
        </Card>
    );
};

export default StatsCard;